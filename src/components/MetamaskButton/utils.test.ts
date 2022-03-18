import { ethers } from "ethers";

import { ENV_TO_CHAIN_ID, ENV_TO_SWITCH_PARAMS } from "config";
import { switchNetwork } from "./utils";

const mockAlert = jest.fn();
global.alert = mockAlert;
//@ts-ignore
const globalAny: { [x: string]: { request: jest.Mock } } = global;
describe("Switch Network", () => {
  const mockRequest = jest.fn();

  globalAny.ethereum = {
    request: mockRequest,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the request function on the injected ethereum object to attempt to switch to the specified network", async () => {
    await switchNetwork("mumbai");

    expect(mockRequest).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: ethers.utils.hexStripZeros(
            ethers.utils.hexlify(ENV_TO_CHAIN_ID.mumbai)
          ),
        },
      ],
    });
  });

  it("attempts to add the network that we attempted to switch to if an error occurs during the switch", async () => {
    globalAny.ethereum.request.mockImplementationOnce(() => Promise.reject());
    await switchNetwork("mumbai");

    expect(mockRequest).toHaveBeenCalledTimes(2);
    expect(mockRequest).lastCalledWith({
      method: "wallet_addEthereumChain",
      params: [ENV_TO_SWITCH_PARAMS.mumbai],
    });
  });

  it("calls alert with the error message if the attempt to add a new network fails", async () => {
    globalAny.ethereum.request.mockImplementation(() =>
      Promise.reject({ message: "__ERROR__" })
    );
    await switchNetwork("mumbai");

    expect(mockRequest).toHaveBeenCalledTimes(2);
    expect(mockRequest).lastCalledWith({
      method: "wallet_addEthereumChain",
      params: [ENV_TO_SWITCH_PARAMS.mumbai],
    });
    expect(mockAlert).toHaveBeenCalledWith("__ERROR__");
  });
});
