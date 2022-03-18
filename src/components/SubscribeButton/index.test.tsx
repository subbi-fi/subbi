import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import * as subbiProvider from "context/SubbiProvider";
import "hooks/contracts";
import SubscribeButton from "components/SubscribeButton";
import { mockTransaction } from "test/utils";

const mockIsSubscribed = mockTransaction("isSubscribed");
const mockSubscribe = mockTransaction("subscribe");
jest.mock("hooks/contracts", () => ({
  useSubscriptionContract: () => ({
    isSubscribed: mockIsSubscribed,
    subscribe: mockSubscribe,
  }),
}));

describe("Subscribe Button", () => {
  beforeEach(jest.clearAllMocks);

  it("renders with the default props and runs the handleSubscribe function when clicked. Once all the actions are complete the loader disappears", async () => {
    render(<SubscribeButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it("calls the passed onSubscribed function upon a successful subscription", async () => {
    const mockOnSubscribed = jest.fn();
    render(
      <SubscribeButton
        subscriptionContractAddress="0xADDRESS"
        onSubscribed={mockOnSubscribed}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockSubscribe).toHaveBeenCalled();
    expect(mockOnSubscribed).toHaveBeenCalled();
  });

  it("if an account is connected then the subscription status of the given user is first checked before subscribing", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockIsSubscribed.mockImplementationOnce(() => Promise.resolve(false));
    render(<SubscribeButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockIsSubscribed).toHaveBeenCalledWith("0xUSER_ADDRESS");
    expect(mockSubscribe).toHaveBeenCalled();
  });

  it("if a user is already subscribed then the subscribe function will not be called. onSubscribed is still called if specified", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockIsSubscribed.mockImplementationOnce(() => Promise.resolve(true));
    render(<SubscribeButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockIsSubscribed).toHaveBeenCalledWith("0xUSER_ADDRESS");
    expect(mockSubscribe).not.toHaveBeenCalled();
  });

  it("calls the onError handler if one is provided and an error is encountered during the handleCancel function", async () => {
    const mockOnError = jest.fn();
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockSubscribe.mockImplementationOnce(() => Promise.reject("ERROR"));
    render(
      <SubscribeButton
        subscriptionContractAddress="0xADDRESS"
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockOnError).toHaveBeenCalledWith("ERROR");
  });
});
