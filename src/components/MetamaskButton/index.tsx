import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import Button from "components/Button";
import Wallet from "./wallet.svg";

import { injected } from "config/connectors";
import { WEB_3_ROOT_KEY, SUPPORTED_CHAIN_IDS } from "config";
import { SupportedNetworks } from "types/ethereum";
import { switchNetwork } from "./utils";

const MetamaskButton = ({
  network = "polygon",
}: {
  network?: SupportedNetworks;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { active, account, chainId, activate } = useWeb3React(WEB_3_ROOT_KEY);

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
    } finally {
      setIsLoading(false);
    }
  };

  const isConnected =
    active && account && chainId && SUPPORTED_CHAIN_IDS.includes(chainId);

  return (
    <>
      {!isConnected && (
        <Button variant="ghost" onClick={activateMetamask} loading={isLoading}>
          Connect Wallet
          <Wallet width={18} height={18} style={{ marginLeft: "5px" }} />
        </Button>
      )}
      {isConnected && (
        <Button variant="ghost" loading={isLoading}>
          {account.slice(0, 5)}...{account.slice(-3)} Connected
        </Button>
      )}
    </>
  );
};

export default MetamaskButton;
