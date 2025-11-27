'use client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {WagmiProvider, createConfig, http} from 'wagmi';
import {mainnet, sepolia} from 'wagmi/chains';
import {AppKit, getDefaultConfig} from '@reown/appkit';

const config = createConfig(
  getDefaultConfig({
    appName: 'MicroPool dApp',
    // Your project ID from WalletConnect Cloud
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
);

const queryClient = new QueryClient();

export default function Web3Provider({children}: {children: React.ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppKit
          theme="dark"
          options={{
            overlayBlur: 'small',
          }}
        >
          {children}
        </AppKit>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
