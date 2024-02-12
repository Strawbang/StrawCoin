import React, { useState } from 'react';
import DefaultLayout from '../components/templates/DefaultLayout';
import { useWalletContext } from '../hooks/WalletContext';

const Ico: React.FC = () => {
	const [purchaseAmount, setPurchaseAmount] = useState<string>('');
	const {
		web3,
		account,
		balance,
		tokenBalance,
		purchaseTokens,
		connectWallet,
	} = useWalletContext();

	const handlePurchase = async () => {
		await purchaseTokens(purchaseAmount);
	};

	return (
		<DefaultLayout>
			<div className="container mx-auto p-4 max-w-md">
				<h1 className="text-3xl font-bold mb-4">StrawCoin ICO</h1>
				{web3 ? (
					<div>
						<p className="mb-2">
							Connected Account:{' '}
							{account?.slice(0, 5) + '...' + account?.slice(39, 42)}
						</p>
						<div className="mb-2">
							<p className="text-gray-600">ETH Balance:</p>
							<p className="font-bold">{balance} ETH</p>
						</div>
						<div className="mb-2">
							<p className="text-gray-600">StrawCoin Balance:</p>
							<p className="font-bold">{tokenBalance} Tokens</p>
						</div>
						<input
							type="number"
							placeholder="Enter ETH amount to purchase"
							className="w-full p-2 mb-2 border rounded"
							value={purchaseAmount}
							onChange={(e) => setPurchaseAmount(e.target.value)}
						/>
						<button
							className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
							onClick={handlePurchase}
						>
							Purchase Tokens
						</button>
					</div>
				) : (
					<div className="text-center">
						<p className="mb-4">
							Connect your wallet to participate in the ICO
						</p>
						<button
							className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
							onClick={connectWallet}
						>
							Connect Wallet
						</button>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Ico;
