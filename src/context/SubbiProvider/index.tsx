import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createWeb3ReactRoot, useWeb3React } from "@web3-react/core";
import { ethers, Signer } from "ethers";

import { SupportedNetworks } from "types/ethereum";
import { WEB_3_ROOT_KEY, DEFAULT_ENV } from "config";

const SubbiWeb3Root = createWeb3ReactRoot(WEB_3_ROOT_KEY);
const getLibrary = (provider: ethers.providers.ExternalProvider) => {
  return new ethers.providers.Web3Provider(provider);
};

interface ISubbiContext {
  network: SupportedNetworks;
  signer?: Signer;
  account?: string;
  active: boolean;
  chainId?: number;
  library?: ethers.providers.Web3Provider;
}
const SubbiContext = createContext<ISubbiContext>({
  network: DEFAULT_ENV,
  signer: undefined,
  active: false,
});
const SubbiProvider = ({
  children,
  network,
  signer,
  useInactiveListener,
}: {
  children: ReactNode;
  network?: SupportedNetworks;
  signer?: Signer;
  useInactiveListener?: boolean;
}) => {
  const [account, setAccount] = useState<undefined | string>(undefined);
  const [active, setActive] = useState<boolean>(false);
  const [chainId, setChainId] = useState<undefined | number>(undefined);

  const web3 = useWeb3React(WEB_3_ROOT_KEY);
  const { ethereum } =
    typeof window === "undefined" ? ({} as any) : (window as any);

  useEffect((): any => {
    if (ethereum && ethereum.on && useInactiveListener) {
      const handleConnect = async (payload: { chainId: string }) => {
        console.log("Handling 'connect' event", payload);
        setChainId(parseInt(payload.chainId));
        const [connectedAccount] = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(connectedAccount);
        setActive(true);
      };
      const handleChainChanged = (chainId: string) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        setChainId(parseInt(chainId));
        setActive(true);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        setAccount(accounts[0]);
        setActive(true);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [ethereum, useInactiveListener]);

  return (
    <SubbiContext.Provider
      value={{
        network: network || DEFAULT_ENV,
        signer,
        active: web3.active || active,
        account: web3.account || account,
        chainId: web3.chainId || chainId,
        library: web3.library || ethereum ? getLibrary(ethereum) : undefined,
      }}
    >
      {children}
    </SubbiContext.Provider>
  );
};

const Provider = ({
  children,
  network,
  signer,
  useInactiveListener = false,
}: {
  children: ReactNode;
  network?: SupportedNetworks;
  signer?: Signer;
  useInactiveListener?: boolean;
}) => (
  <SubbiWeb3Root getLibrary={getLibrary}>
    <SubbiProvider
      network={network}
      signer={signer}
      useInactiveListener={useInactiveListener}
    >
      {children}
    </SubbiProvider>
  </SubbiWeb3Root>
);

export const useSubbiContext = (): ISubbiContext => useContext(SubbiContext);

export default Provider;
