import { ethers } from "ethers";

import { useSubbiContext } from "context/SubbiProvider";
import { ENV_TO_USDC_CONTRACT_ADDRESS } from "config";
import { ERC20_ABI, SUBSCRIPTION_ABI } from "config/abi";
import { IERC20Contract, ISubscriptionContract } from "types/contract";

export const useUSDCContract = (): null | IERC20Contract => {
  const { network, signer, active, library } = useSubbiContext();
  if (!active || !library) return null;

  return new ethers.Contract(
    ENV_TO_USDC_CONTRACT_ADDRESS[network],
    ERC20_ABI,
    signer || library.getSigner()
  ) as ethers.Contract & IERC20Contract;
};
export const useSubscriptionContract = (
  address: string
): null | ISubscriptionContract => {
  const { signer, active, library } = useSubbiContext();
  if (!active || !library) return null;

  return new ethers.Contract(
    address,
    SUBSCRIPTION_ABI,
    signer || library.getSigner()
  ) as ethers.Contract & ISubscriptionContract;
};
