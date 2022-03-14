export interface IERC20Contract {
  approve: (spender: string, amount: string) => Promise<boolean>;
  allowance: (owner: string, spender: string) => Promise<number>;
}
export interface ISubscriptionContract {
  subscribe: () => Promise<void>;
  isSubscribed: (address: string) => Promise<boolean>;
  cancelSubscription: () => Promise<void>;
}
