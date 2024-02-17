import { ethers } from 'ethers';
import { useState } from 'react';
import StrawCoinIco from '../contracts/StrawCoinIco.json';


export interface WalletData {
  web3: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  account: string | null;
  balance: string | null;
  tokenBalance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  purchaseTokens: (amount: string) => Promise<void>;
}

const useWallet = (contractAddress: string) => {
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
          StrawCoinIco.abi,
          signer
        );
        const ethBalance = await contract.getBalance();
        const tokenBalance = await contract.getBalanceToken();
        const hardCap = await contract.hardCap();
        setWeb3(provider);
        setContract(contract);
        setAccount(accounts[0]);
        setBalance(ethers.formatEther(ethBalance));
        setTokenBalance(ethers.formatEther(tokenBalance));
        setHardCap(hardCap);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(
        'Please install MetaMask or another Ethereum wallet extension.'
      );
    }
  };

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
    tokenBalance,
    connectWallet,
    disconnectWallet,
    purchaseTokens,
  } as WalletData;
};

export default useWallet;