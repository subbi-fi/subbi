import { SupportedNetworks } from "./ethereum";

export type CheckoutStep = "connect" | "approve" | "subscribe" | "complete";
type Style = {
  [x: string]: string | number | {};
} & React.CSSProperties;
export interface OnActionProps {
  user: string;
  contract: string;
  network: SupportedNetworks;
}
type OnActionFunction = (arg0: OnActionProps) => void | Promise<void>;

export interface IOptionalButtonProps {
  onError?: (error: any) => void | Promise<void>;
  style?: Style;
}

interface IContractButtons extends IOptionalButtonProps {
  subscriptionContractAddress: string;
}

export interface IApproveButton extends IContractButtons {
  onApproval?: OnActionFunction;
}

export interface ISubscribeButton extends IContractButtons {
  onSubscribed?: OnActionFunction;
}

export interface ICancelButton extends IContractButtons {
  onCancelled?: OnActionFunction;
}

export interface ICheckoutFlow {
  subscriptionContractAddress: string;
  showWeb3Connection: boolean;
  onError?: (error: any) => void | Promise<void>;
  styles?: { [key in CheckoutStep]?: Style };
  onSuccessHandlers?: {
    [key in "connect" | "approve" | "subscribe"]?: OnActionFunction | undefined;
  };
}
