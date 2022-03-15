import { ContractTransaction, ethers } from "ethers";

export interface IERC20Contract extends ethers.Contract {
  approve: (spender: string, amount: string) => Promise<ContractTransaction>;
  allowance: (owner: string, spender: string) => Promise<number>;
}
export interface ISubscriptionContract extends ethers.Contract {
  subscribe: () => Promise<ContractTransaction>;
  isSubscribed: (address: string) => Promise<boolean>;
  cancelSubscription: () => Promise<ContractTransaction>;
}
