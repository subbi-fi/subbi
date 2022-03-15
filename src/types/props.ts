export type CheckoutStep = "connect" | "approve" | "subscribe" | "complete";
type Style = {
  [x: string]: string | number | {};
} & React.CSSProperties;

interface IContractButtons {
  subscriptionContractAddress: string;
  onError?: (error: any) => void | Promise<void>;
  style?: Style;
}

export interface IApproveButton extends IContractButtons {
  onApproval?: () => void | Promise<void>;
}

export interface ISubscribeButton extends IContractButtons {
  onSubscribed?: () => void | Promise<void>;
}

export interface ICheckoutFlow {
  subscriptionContractAddress: string;
  showWeb3Connection: boolean;
  onError?: (error: any) => void | Promise<void>;
  styles?: { [key in CheckoutStep]: Style };
}
