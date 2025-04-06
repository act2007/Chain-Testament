import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

export function useArweave() {
  const uploadToArweave = async (content: string) => {
    try {
      // Create a data transaction
      const transaction = await arweave.createTransaction({
        data: content,
      });

      // Add tags to identify the transaction
      transaction.addTag('Content-Type', 'text/plain');
      transaction.addTag('App-Name', 'ChainTestament');

      // Sign the transaction
      await arweave.transactions.sign(transaction);

      // Submit the transaction
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        return transaction.id;
      } else {
        throw new Error('Failed to upload to Arweave');
      }
    } catch (error) {
      console.error('Error uploading to Arweave:', error);
      throw error;
    }
  };

  const downloadFromArweave = async (transactionId: string) => {
    try {
      const data = await arweave.transactions.getData(transactionId, {
        decode: true,
        string: true,
      });
      return data as string;
    } catch (error) {
      console.error('Error downloading from Arweave:', error);
      throw error;
    }
  };

  return {
    uploadToArweave,
    downloadFromArweave,
  };
} 