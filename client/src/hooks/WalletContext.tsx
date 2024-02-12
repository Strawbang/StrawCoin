import React, { createContext, ReactNode, useContext } from 'react';
import useWallet, { WalletData } from '../hooks/useWallet';

interface WalletProviderProps {
	children: ReactNode;
}

const WalletContext = createContext<WalletData | undefined>(undefined);
const contractAddress = '0x6eCC4bB3D77b82Bfe68Ce2d53F1f720aD6BB602e';

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
	const walletData = useWallet(contractAddress);

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
