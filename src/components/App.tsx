import { Outlet } from 'react-router-dom';
import WagmiProvider from '../contexts/WagmiProvider';
import { WalletProvider } from '../contexts/WalletContext';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Navigation from './layout/Navigation';

function App() {
  return (
    <>
      <WagmiProvider>
        <WalletProvider>
          <div className="application">
            <Header />
            <main>
              <Navigation />
              <Outlet />
            </main>
            <Footer />
          </div>
        </WalletProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
