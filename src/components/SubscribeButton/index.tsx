import React, { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import Button from "components/Button";
import { useSubscriptionContract } from "hooks/contracts";
import { ISubscribeButton } from "types/props";
import { WEB_3_ROOT_KEY } from "config";

const SubscribeButton = ({
  subscriptionContractAddress,
  onError,
  onSubscribed,
  style,
}: ISubscribeButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const subscription = useSubscriptionContract(subscriptionContractAddress);
  const { account } = useWeb3React(WEB_3_ROOT_KEY);

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
          Promise.resolve();
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
