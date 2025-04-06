# ChainTestament

ChainTestament is a decentralized application for creating and managing digital wills on the blockchain. It uses Arweave for permanent storage, IPFS for backup, and smart contracts for access control.

## Features

- Create and manage digital wills
- Permanent storage on Arweave
- IPFS backup
- Multi-signature access control
- Time-locked conditions
- Social proof verification

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Wagmi
- RainbowKit
- Arweave
- IPFS
- Ethereum Smart Contracts

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chain-testament.git
cd chain-testament
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your configuration:
```env
NEXT_PUBLIC_CHAIN_TESTAMENT_ADDRESS=your_contract_address
NEXT_PUBLIC_ACCESS_CONTROL_ADDRESS=your_contract_address
NEXT_PUBLIC_TIME_LOCK_ADDRESS=your_contract_address
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_INFURA_PROJECT_SECRET=your_infura_project_secret
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add the environment variables
5. Deploy

## License

MIT 