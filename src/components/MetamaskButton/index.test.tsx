import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import * as web3React from "@web3-react/core";
import { injected } from "config/connectors";
import { ENV_TO_CHAIN_ID } from "config";

import * as subbiProvider from "context/SubbiProvider";
import MetamaskButton from "components/MetamaskButton";

jest.mock("@web3-react/core");
const mockActivate = jest.fn();
describe("Metamask Button", () => {
  beforeEach(jest.clearAllMocks);

  it("renders with the default props and runs the activateMetamask function when clicked. Once all the actions are complete the loader disappears", async () => {
    jest.spyOn(web3React, "useWeb3React").mockImplementation(() => ({
      activate: mockActivate,
      active: true,
      deactivate: jest.fn(),
      setError: jest.fn(),
    }));

    render(<MetamaskButton />);
    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );

    expect(mockActivate).toHaveBeenCalledWith(
      injected,
      expect.any(Function),
      false
    );
  });

  it("renders a users connected address when successfully connected", async () => {
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: true,
      chainId: ENV_TO_CHAIN_ID["mumbai"],
    }));

    render(<MetamaskButton />);
    expect(screen.getByTestId("Wallet-ConnectedInfo")).toBeTruthy();
  });

  it("calls the provided onError callback if an error is encountered when connecting", async () => {
    const mockOnError = jest.fn();
    jest.spyOn(subbiProvider, "useSubbiContext").mockImplementation(() => ({
      account: "0xUSER_ADDRESS",
      network: "mumbai",
      active: false,
      chainId: ENV_TO_CHAIN_ID["mumbai"],
    }));
    jest.spyOn(web3React, "useWeb3React").mockImplementation(() => ({
      activate: mockActivate.mockImplementation(() => Promise.reject("ERROR")),
      active: true,
      deactivate: jest.fn(),
      setError: jest.fn(),
    }));

    render(<MetamaskButton onError={mockOnError} />);
    fireEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId("LoadingSpinner")
    );

    expect(mockActivate).toHaveBeenCalledWith(
      injected,
      expect.any(Function),
      false
    );
    expect(mockOnError).toHaveBeenCalledWith("ERROR");
  });
});
