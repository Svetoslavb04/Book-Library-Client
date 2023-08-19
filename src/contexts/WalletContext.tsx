import { createContext, useContext, useMemo } from 'react';

import { ethers, FallbackProvider, JsonRpcProvider, BrowserProvider, JsonRpcSigner } from 'ethers';
import { PublicClient, WalletClient, usePublicClient, useWalletClient } from 'wagmi';

type WalletContextValue = {
  provider: FallbackProvider | JsonRpcProvider | undefined;
  signer: JsonRpcSigner | undefined;
};

const defaultValue: WalletContextValue = {
  provider: undefined,
  signer: undefined,
};
const WalletContext = createContext<WalletContextValue>(defaultValue);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const provider = useMemo(() => publicClientToProvider(publicClient), [publicClient]);

  const signer = useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  );

  function publicClientToProvider(publicClient: PublicClient) {
    const { chain, transport } = publicClient;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    if (transport.type === 'fallback') {
      const providers = transport.transports.map(
        ({ value }: any) => new JsonRpcProvider(value?.url, network),
      );
      if (providers.length === 1) return providers[0];
      return new FallbackProvider(providers);
    }
    return new JsonRpcProvider(transport.url, network);
  }

  function walletClientToSigner(walletClient: WalletClient) {
    const { account, chain, transport } = walletClient;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address);

    return signer;
  }

  return <WalletContext.Provider value={{ provider, signer }}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => useContext(WalletContext);

export const useContract = (
  address: string,
  abi: ethers.Interface | ethers.InterfaceAbi,
  readonly = true,
) => {
  const { provider, signer } = useWalletContext();

  const contract = useMemo(() => {
    if (signer && !readonly) {
      return new ethers.Contract(address, abi, signer);
    } else if (provider) {
      return new ethers.Contract(address, abi, provider);
    } else {
      return null;
    }
  }, [provider, signer]);

  return contract;
};
