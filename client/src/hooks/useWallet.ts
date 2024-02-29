import { ethers } from 'ethers';
import { useState } from 'react';


export interface WalletData {
  web3: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  account: string | null;
  balance: string | null;
  tokenBalance: string;
  hardCap: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  purchaseTokens: (amount: string) => Promise<void>;
}

const useWallet = (contractAddress: string, contractAbi: ({ inputs: { internalType: string; name: string; type: string; }[]; stateMutability: string; type: string; name?: undefined; anonymous?: undefined; outputs?: undefined; } | { inputs: { internalType: string; name: string; type: string; }[]; name: string; type: string; stateMutability?: undefined; anonymous?: undefined; outputs?: undefined; } | { anonymous: boolean; inputs: { indexed: boolean; internalType: string; name: string; type: string; }[]; name: string; type: string; stateMutability?: undefined; outputs?: undefined; } | { inputs: { internalType: string; name: string; type: string; }[]; name: string; outputs: { internalType: string; name: string; type: string; }[]; stateMutability: string; type: string; anonymous?: undefined; })[] | ethers.Interface | ethers.InterfaceAbi) => {
  const [web3, setWeb3] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [hardCap, setHardCap] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setWeb3(provider);
        setContract(contract);
        setAccount(accounts[0]);
        strawCoinIco(contract);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(
        'Please install MetaMask or another Ethereum wallet extension.'
      );
    }
  };

  const strawCoinIco = async (contract : ethers.Contract) => {
    const ethBalance = await contract.getBalance();
    const tokenBalance = await contract.getBalanceToken();
    const hardCap = await contract.getHardCap();
    setBalance(ethers.formatEther(ethBalance));
    setTokenBalance(ethers.formatEther(tokenBalance));
    setHardCap(ethers.formatEther(hardCap));
  }

  const disconnectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{eth_accounts: {}}]
      });
      setWeb3(null);
      setContract(null);
      setAccount(null);
      setBalance(null);
      setTokenBalance(null);
    }
  };

  const purchaseTokens = async (amount: string) => {
    try {
      const tx = await contract?.buyTokens({
        value: ethers.parseEther(amount),
      });
      await tx?.wait();
      const ethBalance = await contract?.getBalance();
      const tokenBalance = await contract?.getBalanceToken();
      setBalance(ethers.formatEther(ethBalance || 0));
      setTokenBalance(ethers.formatEther(tokenBalance || 0));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    web3,
    contract,
    account,
    balance,
    hardCap,
    tokenBalance,
    connectWallet,
    disconnectWallet,
    purchaseTokens,
  } as WalletData;
};

export default useWallet;