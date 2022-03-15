import React, { createContext, ReactNode, useContext } from "react";
import { createWeb3ReactRoot } from "@web3-react/core";
import { ethers, Signer } from "ethers";

import { SupportedNetworks } from "types/ethereum";
import { WEB_3_ROOT_KEY } from "config";

const SubbiWeb3Root = createWeb3ReactRoot(WEB_3_ROOT_KEY);
const getLibrary = (provider: ethers.providers.ExternalProvider) => {
  return new ethers.providers.Web3Provider(provider);
};

interface ISubbiContext {
  network: SupportedNetworks;
  signer?: Signer;
}
const SubbiContext = createContext<ISubbiContext>({
  network: "polygon",
  signer: undefined,
});
const SubbiProvider = ({
  children,
  network,
  signer,
}: {
  children: ReactNode;
  network?: SupportedNetworks;
  signer?: Signer;
}) => (
  <SubbiContext.Provider value={{ network: network || "polygon", signer }}>
    <SubbiWeb3Root getLibrary={getLibrary}>{children}</SubbiWeb3Root>
  </SubbiContext.Provider>
);

export const useSubbiContext = (): ISubbiContext => useContext(SubbiContext);

export default SubbiProvider;
