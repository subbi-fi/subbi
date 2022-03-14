import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "components/Button";
import Wallet from "components/MetamaskButton/wallet.svg";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Button variant="primary">Button</Button>
);
export const Ghost: ComponentStory<typeof Button> = () => (
  <Button variant="ghost">Button</Button>
);
export const StyleOverload: ComponentStory<typeof Button> = () => (
  <Button
    variant="ghost"
    style={{
      border: "2px solid palevioletred",
      "&:hover": { backgroundColor: "palevioletred" },
    }}
  >
    Button
  </Button>
);
export const WithIcon: ComponentStory<typeof Button> = () => (
  <Button variant="primary">
    <>
      Connect Me <Wallet style={{ marginLeft: "5px" }} height={18} width={18} />
    </>
  </Button>
);
