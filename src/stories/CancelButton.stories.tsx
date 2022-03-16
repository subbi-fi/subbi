import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SubbiProvider from "context/SubbiProvider";
import CancelButton from "components/CancelButton";

export default {
  title: "Cancel Button",
  component: CancelButton,
} as ComponentMeta<typeof CancelButton>;

export const JustTheButton: ComponentStory<typeof CancelButton> = () => (
  <CancelButton subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412" />
);

export const WithProvider: ComponentStory<typeof CancelButton> = () => (
  <SubbiProvider network="mumbai" useInactiveListener>
    <CancelButton subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412" />
  </SubbiProvider>
);
