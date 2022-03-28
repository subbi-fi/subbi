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
  const { account, network } = useSubbiContext();

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
          setIsLoading(false);
          if (onSubscribed) {
            onSubscribed({
              user: account,
              network,
              contract: subscriptionContractAddress,
            });
          }
          return;
        }
      }

      const tx = await subscription.subscribe();
      await tx.wait();

      setIsLoading(false);
      if (onSubscribed) {
        onSubscribed({
          user: account || "",
          network,
          contract: subscriptionContractAddress,
        });
      }
    } catch (error) {
      console.log("Error subscribing to contract: ", error);

      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    }
  }, [subscription]);

  return (
    <Button
      data-testid="Button-SubscribeButton"
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
