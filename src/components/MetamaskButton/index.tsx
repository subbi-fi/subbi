import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import Button from "components/Button";
import Wallet from "./wallet.svg";

import { useSubbiContext } from "context/SubbiProvider";
import { injected } from "config/connectors";
import { WEB_3_ROOT_KEY, SUPPORTED_CHAIN_IDS } from "config";
import { IOptionalButtonProps } from "types/props";
import { switchNetwork } from "./utils";

const MetamaskButton = ({ style, onError }: IOptionalButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { network, active, account, chainId } = useSubbiContext();
  const { activate } = useWeb3React(WEB_3_ROOT_KEY);

  const activateMetamask = async () => {
    setIsLoading(true);
    try {
      await activate(
        injected,
        async () => {
          await switchNetwork(network);
        },
        false
      );
    } catch (error: any) {
      console.log("Error activating network", error, error.name);
      if (onError) {
        await onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isConnected =
    active && account && chainId && SUPPORTED_CHAIN_IDS.includes(chainId);

  return (
    <>
      {!isConnected && (
        <Button
          variant="ghost"
          onClick={activateMetamask}
          loading={isLoading}
          style={style}
        >
          Connect Wallet
          <Wallet width={18} height={18} style={{ marginLeft: "5px" }} />
        </Button>
      )}
      {isConnected && (
        <Button variant="ghost" loading={isLoading} style={style}>
          {account.slice(0, 5)}...{account.slice(-3)} Connected
        </Button>
      )}
    </>
  );
};

export default MetamaskButton;
