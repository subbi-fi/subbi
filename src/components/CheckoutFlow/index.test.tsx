import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import "hooks/contracts";
import { mockTransaction } from "test/utils";
import CheckoutFlow from "components/CheckoutFlow";
import * as subbiProvider from "context/SubbiProvider";

const mockApprove = mockTransaction("approve");
const mockSubscribe = mockTransaction("subscribe");
jest.mock("hooks/contracts", () => ({
  useUSDCContract: () => ({
    approve: mockApprove,
    allowance: jest.fn(() => Promise.resolve("10")),
  }),
  useSubscriptionContract: () => ({
    subscribe: mockSubscribe,
    isSubscribed: jest.fn(() => Promise.resolve(false)),
  }),
}));

describe("Checkout Flow", () => {
  beforeEach(jest.clearAllMocks);

  it("shows the Metamask button when rendered in the showWeb3Connection state", () => {
    render(
      <CheckoutFlow
        subscriptionContractAddress="0xADDRESS"
        showWeb3Connection
      />
    );

    expect(screen.getAllByTestId("Wallet-ConnectButton")).toBeTruthy();
  });

  it("shows the Approval button when rendered and showWeb3Connection is false", () => {
    render(
      <CheckoutFlow
        subscriptionContractAddress="0xADDRESS"
        showWeb3Connection={false}
      />
    );

    expect(screen.getByTestId("Button-ApproveButton")).toBeTruthy();
  });

  it("updates the Checkout Step and displays the approve button upon a successful connection", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));

    render(
      <CheckoutFlow
        subscriptionContractAddress="0xADDRESS"
        showWeb3Connection
      />
    );
    expect(screen.getByTestId("Button-ApproveButton")).toBeTruthy();
  });

  it("moves through the Checkout Flow buttons as a user performs each action in sequence", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));

    render(
      <CheckoutFlow
        subscriptionContractAddress="0xADDRESS"
        showWeb3Connection={false}
      />
    );
    expect(screen.getByTestId("Button-ApproveButton")).toBeTruthy();

    fireEvent.click(screen.getByTestId("Button-ApproveButton"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );

    expect(screen.getByTestId("Button-SubscribeButton")).toBeTruthy();

    fireEvent.click(screen.getByTestId("Button-SubscribeButton"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );

    expect(screen.getByTestId("CheckoutFlow-Complete")).toBeTruthy();
  });
});
