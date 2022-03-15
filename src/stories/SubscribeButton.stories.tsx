import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SubbiProvider from "context/SubbiProvider";
import SubscribeButton from "components/SubscribeButton";

export default {
  title: "Subscribe Button",
  component: SubscribeButton,
} as ComponentMeta<typeof SubscribeButton>;

export const JustTheButton: ComponentStory<typeof SubscribeButton> = () => (
  <SubscribeButton subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412" />
);

export const WithProvider: ComponentStory<typeof SubscribeButton> = () => (
  <SubbiProvider network="mumbai">
    <SubscribeButton subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412" />
  </SubbiProvider>
);
