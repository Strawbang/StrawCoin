import React from 'react';
import { Link } from 'react-router-dom';

import { useWalletContext } from '../../hooks/WalletContext';

const NavBar: React.FC = () => {
	const { web3, connectWallet, account, disconnectWallet } = useWalletContext();

	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-white text-lg font-bold">
					StrawCoin
				</Link>
				{web3 ? (
					<div className="flex items-center">
						<div className="text-white mr-4">
							{account?.slice(0, 5) + '...' + account?.slice(39, 42)}
						</div>
						<button
							className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
							onClick={disconnectWallet}
						>
							Disconnect Wallet
						</button>
					</div>
				) : (
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
						onClick={connectWallet}
					>
						Connect Wallet
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
