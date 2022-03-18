import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import * as subbiProvider from "context/SubbiProvider";
import "hooks/contracts";
import CancelButton from "components/CancelButton";
import { mockTransaction } from "test/utils";

const mockIsSubscribed = mockTransaction("isSubscribed");
const mockCancelSubscription = mockTransaction("cancel");
jest.mock("hooks/contracts", () => ({
  useSubscriptionContract: () => ({
    isSubscribed: mockIsSubscribed,
    cancelSubscription: mockCancelSubscription,
  }),
}));

describe("Cancel Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the default props and runs the handleCancel function when clicked. Once all the actions are complete the loader disappears", async () => {
    render(<CancelButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockCancelSubscription).toHaveBeenCalled();
  });

  it("calls the passed onCancelled function upon a successful cancellation", async () => {
    const mockOnCancelled = jest.fn();
    render(
      <CancelButton
        subscriptionContractAddress="0xADDRESS"
        onCancelled={mockOnCancelled}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockCancelSubscription).toHaveBeenCalled();
    expect(mockOnCancelled).toHaveBeenCalled();
  });

  it("if an account is connected then the subscription status of the given user is first checked before cancelling the subscription", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockIsSubscribed.mockImplementationOnce(() => Promise.resolve(true));
    render(<CancelButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockIsSubscribed).toHaveBeenCalledWith("0xUSER_ADDRESS");
    expect(mockCancelSubscription).toHaveBeenCalled();
  });

  it("if a user is already not subscribed then the cancelSubscription function will not be called. onCancelled is still called if specified", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockIsSubscribed.mockImplementationOnce(() => Promise.resolve(false));
    render(<CancelButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockIsSubscribed).toHaveBeenCalledWith("0xUSER_ADDRESS");
    expect(mockCancelSubscription).not.toHaveBeenCalled();
  });

  it("calls the onError handler if one is provided and an error is encountered during the handleCancel function", async () => {
    const mockOnError = jest.fn();
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockCancelSubscription.mockImplementationOnce(() =>
      Promise.reject("ERROR")
    );
    render(
      <CancelButton
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
