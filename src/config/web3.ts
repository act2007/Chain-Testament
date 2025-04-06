import { Chain } from 'viem/chains';

export const SEPOLIA_CHAIN: Chain = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia.infura.io/v3/'] },
    public: { http: ['https://sepolia.infura.io/v3/'] },
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
};

export const CHAIN_TESTAMENT_ADDRESS = process.env.NEXT_PUBLIC_CHAIN_TESTAMENT_ADDRESS || '';
export const ACCESS_CONTROL_ADDRESS = process.env.NEXT_PUBLIC_ACCESS_CONTROL_ADDRESS || '';
export const TIME_LOCK_ADDRESS = process.env.NEXT_PUBLIC_TIME_LOCK_ADDRESS || '';

export const SUPPORTED_CHAINS = [SEPOLIA_CHAIN]; 