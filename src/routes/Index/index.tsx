import './Index.scss';

import { useAccount, useConnect } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const Index = () => {
  const connector = new MetaMaskConnector({
    chains: [sepolia],
    options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  });

  const { address } = useAccount();
  const { connect, isLoading, isSuccess } = useConnect({ connector });

  const handleConnectMetaMask = () => {
    if (!isSuccess) {
      connect();
    }
  };

  return (
    <div style={{ margin: '20% 10%' }}>
      <div>
        <button className="connect-wallet-btn" onClick={handleConnectMetaMask}>
          {isLoading ? 'Loading...' : isSuccess ? 'Connected' : 'Connect MetaMask'}
        </button>
      </div>
      <div>{isSuccess ? `The connected address is ${address}` : ''}</div>
    </div>
  );
};

export default Index;
