import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SubbiProvider from "context/SubbiProvider";
import CheckoutFlow from "components/CheckoutFlow";

export default {
  title: "Checkout Flow",
  component: CheckoutFlow,
} as ComponentMeta<typeof CheckoutFlow>;

export const WithConnection: ComponentStory<typeof CheckoutFlow> = () => (
  <SubbiProvider network="mumbai" useInactiveListener>
    <CheckoutFlow
      subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412"
      showWeb3Connection
    />
  </SubbiProvider>
);

export const NoConnection: ComponentStory<typeof CheckoutFlow> = () => (
  <SubbiProvider network="mumbai" useInactiveListener>
    <CheckoutFlow
      subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412"
      showWeb3Connection={false}
    />
  </SubbiProvider>
);
