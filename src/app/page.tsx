'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useChainTestament } from '@/hooks/useChainTestament';
import { useArweave } from '@/hooks/useArweave';
import { useIPFS } from '@/hooks/useIPFS';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { createWill, updateWill, accessWill } = useChainTestament();
  const { uploadToArweave } = useArweave();
  const { uploadToIPFS } = useIPFS();
  const [willContent, setWillContent] = useState('');
  const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
  const [newBeneficiary, setNewBeneficiary] = useState('');

  const handleCreateWill = async () => {
    if (!willContent || !address) return;

    try {
      // Upload to Arweave
      const arweaveHash = await uploadToArweave(willContent);
      
      // Upload to IPFS as backup
      const ipfsHash = await uploadToIPFS(willContent);

      // Create will on blockchain
      await createWill(arweaveHash, ipfsHash, beneficiaries);
      
      alert('Will created successfully!');
    } catch (error) {
      console.error('Error creating will:', error);
      alert('Failed to create will');
    }
  };

  const handleAddBeneficiary = () => {
    if (newBeneficiary && !beneficiaries.includes(newBeneficiary)) {
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      setNewBeneficiary('');
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">ChainTestament</h1>
        
        <div className="mb-8">
          <ConnectButton />
        </div>

        {isConnected && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Create Your Will</h2>
              <textarea
                className="w-full h-48 p-4 border rounded-lg"
                placeholder="Enter your will content..."
                value={willContent}
                onChange={(e) => setWillContent(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Beneficiaries</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded"
                  placeholder="Enter beneficiary address"
                  value={newBeneficiary}
                  onChange={(e) => setNewBeneficiary(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAddBeneficiary}
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {beneficiaries.map((beneficiary, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span>{beneficiary}</span>
                    <button
                      className="text-red-500"
                      onClick={() => setBeneficiaries(beneficiaries.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg"
              onClick={handleCreateWill}
            >
              Create Will
            </button>
          </div>
        )}
      </div>
    </main>
  );
} 