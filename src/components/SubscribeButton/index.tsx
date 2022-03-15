import React, { useCallback, useState } from "react";

import Button from "components/Button";
import { useSubbiContext } from "context/SubbiProvider";
import { useSubscriptionContract } from "hooks/contracts";
import { ISubscribeButton } from "types/props";

const SubscribeButton = ({
  subscriptionContractAddress,
  onError,
  onSubscribed,
  style,
}: ISubscribeButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const subscription = useSubscriptionContract(subscriptionContractAddress);
  const { account } = useSubbiContext();

  const handleSubscribe = useCallback(async () => {
    if (!subscription) {
      console.log("No contract found. Did you set the SubbiProvider properly?");
      return;
    }

    setIsLoading(true);
    try {
      if (account) {
        const isSubscribed = await subscription.isSubscribed(account);

        if (isSubscribed) {
          if (onSubscribed) {
            await onSubscribed();
          }
          return;
        }
      }

      const tx = await subscription.subscribe();
      await tx.wait();

      if (onSubscribed) {
        await onSubscribed();
      }
    } catch (error) {
      console.log("Error subscribing to contract: ", error);

      if (onError) {
        await onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [subscription]);

  return (
    <Button
      style={style}
      variant="primary"
      onClick={handleSubscribe}
      loading={isLoading}
    >
      Subscribe
    </Button>
  );
};

export default SubscribeButton;
