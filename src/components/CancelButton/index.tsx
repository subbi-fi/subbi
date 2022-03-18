import React, { useCallback, useState } from "react";

import Button from "components/Button";
import { useSubbiContext } from "context/SubbiProvider";
import { useSubscriptionContract } from "hooks/contracts";
import { ICancelButton } from "types/props";

const CancelButton = ({
  subscriptionContractAddress,
  onError,
  onCancelled,
  style,
}: ICancelButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const subscription = useSubscriptionContract(subscriptionContractAddress);
  const { account } = useSubbiContext();

  const handleCancel = useCallback(async () => {
    if (!subscription) {
      console.log("No contract found. Did you set the SubbiProvider properly?");
      return;
    }

    setIsLoading(true);
    try {
      if (account) {
        const isSubscribed = await subscription.isSubscribed(account);

        if (!isSubscribed) {
          setIsLoading(false);
          if (onCancelled) {
            onCancelled();
          }
          return;
        }
      }

      const tx = await subscription.cancelSubscription();
      await tx.wait();

      setIsLoading(false);
      if (onCancelled) {
        onCancelled();
      }
    } catch (error) {
      console.log("Error cancelling subscription to contract: ", error);

      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    }
  }, [subscription]);

  return (
    <Button
      data-testid="Button-CancelButton"
      style={style}
      variant="ghost"
      onClick={handleCancel}
      loading={isLoading}
    >
      Cancel subscription
    </Button>
  );
};

export default CancelButton;
