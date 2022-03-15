import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SubbiProvider from "context/SubbiProvider";
import ApproveButton from "components/ApproveButton";

export default {
  title: "Approve Button",
  component: ApproveButton,
} as ComponentMeta<typeof ApproveButton>;

export const JustTheButton: ComponentStory<typeof ApproveButton> = () => (
  <ApproveButton subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412" />
);

export const WithProvider: ComponentStory<typeof ApproveButton> = () => (
  <SubbiProvider network="mumbai" useInactiveListener>
    <ApproveButton subscriptionContractAddress="0xf597b825fd898fe3d5b58ca3a31ac9607e4c6412" />
  </SubbiProvider>
);
