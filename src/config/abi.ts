export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
];

export const SUBSCRIPTION_ABI = [
  "function subscribe() external",
  "function isSubscribed(address user) external view returns (bool)",
  "function deleteSubscriptionContract() external",
  "function pause() external",
  "function unpause() external",
  "function isPaused() public view returns (bool)",
  "function cancelSubscription() external",
];
