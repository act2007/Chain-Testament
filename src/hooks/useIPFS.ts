import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`
    ).toString('base64')}`,
  },
});

export function useIPFS() {
  const uploadToIPFS = async (content: string) => {
    try {
      const { path } = await ipfs.add(content);
      return path;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  };

  const downloadFromIPFS = async (hash: string) => {
    try {
      const chunks = [];
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks).toString();
    } catch (error) {
      console.error('Error downloading from IPFS:', error);
      throw error;
    }
  };

  return {
    uploadToIPFS,
    downloadFromIPFS,
  };
} 