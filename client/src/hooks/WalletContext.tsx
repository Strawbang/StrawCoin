import React, { createContext, ReactNode, useContext } from 'react';
import address from '../contracts/address.json';
import StrawCoinIco from '../contracts/StrawCoinIco.json';
import useWallet, { WalletData } from '../hooks/useWallet';

interface WalletProviderProps {
	children: ReactNode;
}

const WalletContext = createContext<WalletData | undefined>(undefined);
const contractAddress = address.StrawCoinIco;
const contractAbi = StrawCoinIco.abi;

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
	const walletData = useWallet(contractAddress, contractAbi);

	return (
		<WalletContext.Provider value={walletData}>
			{children}
		</WalletContext.Provider>
	);
};

const useWalletContext = () => {
	const context = useContext(WalletContext);
	if (!context) {
		throw new Error('useWalletContext must be used within a WalletProvider');
	}
	return context;
};

export { useWalletContext, WalletProvider };
