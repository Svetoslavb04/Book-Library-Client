import { Outlet } from 'react-router-dom';
import WagmiProvider from '../contexts/WagmiProvider';
import { WalletProvider } from '../contexts/WalletContext';

function App() {
  return (
    <>
      <WagmiProvider>
        <WalletProvider>
          <div className="application">
            <main>
              <Outlet />
            </main>
          </div>
        </WalletProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
