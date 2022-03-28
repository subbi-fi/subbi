import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import * as subbiProvider from "context/SubbiProvider";
import "hooks/contracts";
import { MAX_UINT } from "config";
import ApproveButton from "components/ApproveButton";
import { mockTransaction } from "test/utils";

const mockApprove = mockTransaction("approve");
const mockAllowance = mockTransaction("allowance");
jest.mock("hooks/contracts", () => ({
  useUSDCContract: () => ({
    approve: mockApprove,
    allowance: mockAllowance,
  }),
}));

describe("Approve Button", () => {
  beforeEach(jest.clearAllMocks);

  it("renders with the default props and runs the handleApproval function when clicked. Once all the actions are complete the loader disappears", async () => {
    render(<ApproveButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockApprove).toHaveBeenCalledWith("0xADDRESS", MAX_UINT);
  });

  it("calls the passed onApproval function upon a successful approval", async () => {
    const mockOnApproval = jest.fn();
    render(
      <ApproveButton
        subscriptionContractAddress="0xADDRESS"
        onApproval={mockOnApproval}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockApprove).toHaveBeenCalledWith("0xADDRESS", MAX_UINT);
    expect(mockOnApproval).toHaveBeenCalledWith({
      contract: "0xADDRESS",
      network: "polygon",
      user: "",
    });
  });

  it("if an account is connected then the allowance of the given user is first checked before approving spending", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockAllowance.mockImplementationOnce(() => Promise.resolve("10"));
    render(<ApproveButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockAllowance).toHaveBeenCalledWith("0xUSER_ADDRESS", "0xADDRESS");
    expect(mockApprove).toHaveBeenCalledWith("0xADDRESS", MAX_UINT);
  });

  it("if a users allowance is equal to the maximum uint then approval is not requested. onApproval is still called if specified", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockAllowance.mockImplementationOnce(() => Promise.resolve(MAX_UINT));
    render(<ApproveButton subscriptionContractAddress="0xADDRESS" />);

    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );
    expect(mockAllowance).toHaveBeenCalledWith("0xUSER_ADDRESS", "0xADDRESS");
    expect(mockApprove).not.toHaveBeenCalledWith();
  });

  it("calls the onError handler if one is provided and an error is encountered during the handleApproval function", async () => {
    const mockOnError = jest.fn();
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "",
      network: "mumbai",
      active: true,
    }));
    //@ts-ignore
    mockApprove.mockImplementationOnce(() => Promise.reject("ERROR"));
    render(
      <ApproveButton
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
