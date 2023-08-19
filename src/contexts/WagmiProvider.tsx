import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  const { publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [infuraProvider({ apiKey: '8c25b9c3cc0d49d290643670b17ce6e3' })],
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
