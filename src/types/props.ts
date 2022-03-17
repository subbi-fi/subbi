export type CheckoutStep = "connect" | "approve" | "subscribe" | "complete";
type Style = {
  [x: string]: string | number | {};
} & React.CSSProperties;

export interface IOptionalButtonProps {
  onError?: (error: any) => void | Promise<void>;
  style?: Style;
}

interface IContractButtons extends IOptionalButtonProps {
  subscriptionContractAddress: string;
}

export interface IApproveButton extends IContractButtons {
  onApproval?: () => void | Promise<void>;
}

export interface ISubscribeButton extends IContractButtons {
  onSubscribed?: () => void | Promise<void>;
}

export interface ICancelButton extends IContractButtons {
  onCancelled?: () => void | Promise<void>;
}

export interface ICheckoutFlow {
  subscriptionContractAddress: string;
  showWeb3Connection: boolean;
  onError?: (error: any) => void | Promise<void>;
  styles?: { [key in CheckoutStep]?: Style };
  onSuccessHandlers?: {
    [key in "connect" | "approve" | "subscribe"]?:
      | (() => void | Promise<void>)
      | undefined;
  };
}
