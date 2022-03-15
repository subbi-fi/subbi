import React, { useCallback, useState, useEffect } from "react";
import { useSubbiContext } from "context/SubbiProvider";

import MetamaskButton from "components/MetamaskButton";
import ApproveButton from "components/ApproveButton";
import SubscribeButton from "components/SubscribeButton";
import Button from "components/Button";

import { ICheckoutFlow, CheckoutStep } from "types/props";

import { Container, SlideLeft } from "./styles";

const CHECKOUT_STEPS: { [x: string]: CheckoutStep } = {
  connect: "connect",
  approve: "approve",
  subscribe: "subscribe",
  complete: "complete",
};

const defaultStyles = {
  approve: {},
  subscribe: {},
  complete: {},
  connect: {},
};
const CheckoutFlow = ({
  subscriptionContractAddress,
  showWeb3Connection,
  styles = defaultStyles,
  onError,
}: ICheckoutFlow) => {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(
    showWeb3Connection ? CHECKOUT_STEPS.connect : CHECKOUT_STEPS.approve
  );
  const { account, active } = useSubbiContext();

  useEffect(() => {
    if (!!account && active && checkoutStep === CHECKOUT_STEPS.connect) {
      setCheckoutStep(CHECKOUT_STEPS.approve);
    }
  }, [account, active, checkoutStep]);
  const handleOnApproval = useCallback(
    () => setCheckoutStep(CHECKOUT_STEPS.subscribe),
    []
  );
  const handleOnSubscribed = useCallback(
    () => setCheckoutStep(CHECKOUT_STEPS.complete),
    []
  );

  return (
    <Container>
      {checkoutStep === CHECKOUT_STEPS.connect && <MetamaskButton />}
      {checkoutStep === CHECKOUT_STEPS.approve && (
        <SlideLeft>
          <ApproveButton
            subscriptionContractAddress={subscriptionContractAddress}
            onApproval={handleOnApproval}
            onError={onError}
            style={styles[CHECKOUT_STEPS.approve]}
          />
        </SlideLeft>
      )}
      {checkoutStep === CHECKOUT_STEPS.subscribe && (
        <SlideLeft>
          <SubscribeButton
            subscriptionContractAddress={subscriptionContractAddress}
            onSubscribed={handleOnSubscribed}
            onError={onError}
            style={styles[CHECKOUT_STEPS.subscribe]}
          />
        </SlideLeft>
      )}
      {checkoutStep === CHECKOUT_STEPS.complete && (
        <SlideLeft>
          <Button
            disabled
            variant="primary"
            style={styles[CHECKOUT_STEPS.complete]}
          >
            Complete!
          </Button>
        </SlideLeft>
      )}
    </Container>
  );
};

export default CheckoutFlow;
