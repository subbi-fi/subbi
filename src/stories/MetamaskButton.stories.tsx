import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SubbiProvider from "context/SubbiProvider";
import MetamaskButton from "components/MetamaskButton";

export default {
  title: "Metamask Button",
  component: MetamaskButton,
} as ComponentMeta<typeof MetamaskButton>;

export const JustTheButton: ComponentStory<typeof MetamaskButton> = () => (
  <MetamaskButton />
);

export const WithMumbaiProvider: ComponentStory<typeof MetamaskButton> = () => (
  <SubbiProvider network="mumbai">
    <MetamaskButton />
  </SubbiProvider>
);

export const WithPolygonProvider: ComponentStory<
  typeof MetamaskButton
> = () => (
  <SubbiProvider network="polygon">
    <MetamaskButton />
  </SubbiProvider>
);
