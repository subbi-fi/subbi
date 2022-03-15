import { ethers } from "ethers";
import { SupportedNetworks, NetworkParams } from "types/ethereum";

export const WEB_3_ROOT_KEY = "@subbi/web3";
export const ENV_TO_CHAIN_ID = {
  polygon: 137,
  mumbai: 80001,
};
export const ENV_TO_SWITCH_PARAMS: {
  [key in SupportedNetworks]: NetworkParams;
} = {
  polygon: {
    chainId: ethers.utils.hexStripZeros(
      ethers.utils.hexlify(ENV_TO_CHAIN_ID.polygon)
    ),
    chainName: "Polygon",
    rpcUrls: ["https://matic.chainstacklabs.com"],
    nativeCurrency: {
      name: "Matic",
      symbol: "Matic",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  mumbai: {
    chainId: ethers.utils.hexStripZeros(
      ethers.utils.hexlify(ENV_TO_CHAIN_ID.mumbai)
    ),
    chainName: "Polygon Testnet",
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    nativeCurrency: {
      name: "Matic",
      symbol: "Matic",
      decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};
export const SUPPORTED_CHAIN_IDS = [
  137, // polygon
  80001, // mumbai
];
export const ENV_TO_USDC_CONTRACT_ADDRESS: {
  [key in SupportedNetworks]: string;
} = {
  polygon: "",
  mumbai: "0xe6b8a5cf854791412c1f6efc7caf629f5df1c747",
};
export const MAX_UINT = ethers.BigNumber.from("2")
  .pow(ethers.BigNumber.from("256").sub(ethers.BigNumber.from("1")))
  .toString();
export const ONE_USDC = 1000000;
export const ONE_USDC_CENT = 10000;
