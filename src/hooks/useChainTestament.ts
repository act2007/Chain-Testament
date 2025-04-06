import { useContract, useSigner } from 'wagmi';
import { CHAIN_TESTAMENT_ADDRESS } from '@/config/web3';
import ChainTestamentABI from '@/contracts/ChainTestament.json';

export function useChainTestament() {
  const { data: signer } = useSigner();
  const contract = useContract({
    address: CHAIN_TESTAMENT_ADDRESS,
    abi: ChainTestamentABI.abi,
    signerOrProvider: signer,
  });

  const createWill = async (arweaveHash: string, ipfsHash: string, beneficiaries: string[]) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.createWill(arweaveHash, ipfsHash, beneficiaries);
    await tx.wait();
  };

  const updateWill = async (newArweaveHash: string, newIpfsHash: string) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.updateWill(newArweaveHash, newIpfsHash);
    await tx.wait();
  };

  const accessWill = async (ownerAddress: string) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.accessWill(ownerAddress);
    await tx.wait();
  };

  const getWill = async (ownerAddress: string) => {
    if (!contract) throw new Error('Contract not initialized');
    return await contract.wills(ownerAddress);
  };

  return {
    createWill,
    updateWill,
    accessWill,
    getWill,
  };
} 