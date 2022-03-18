import { ethers } from "ethers";

import { SupportedNetworks } from "types/ethereum";
import { ENV_TO_CHAIN_ID, ENV_TO_SWITCH_PARAMS } from "config";

export const switchNetwork = async (network: SupportedNetworks) => {
  const { ethereum } = window as any;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: ethers.utils.hexStripZeros(
            ethers.utils.hexlify(ENV_TO_CHAIN_ID[network])
          ),
        },
      ],
    });
  } catch (error: any) {
    console.log("Error switching network", error, error?.code);
    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [ENV_TO_SWITCH_PARAMS[network]],
      });
    } catch (error: any) {
      alert(error?.message);
    }
  }
};
