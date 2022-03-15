interface IContractButtons {
  subscriptionContractAddress: string;
  onError?: (error: any) => void | Promise<void>;
  style?: {
    [x: string]: string | number | {};
  } & React.CSSProperties;
}

export interface IApproveButton extends IContractButtons {
  onApproval?: () => void | Promise<void>;
}

export interface ISubscribeButton extends IContractButtons {
  onSubscribed?: () => void | Promise<void>;
}
