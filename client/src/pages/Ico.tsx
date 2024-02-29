import React, { useState } from 'react';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/Input';
import DefaultLayout from '../components/templates/DefaultLayout';
import { useWalletContext } from '../hooks/WalletContext';

const Ico: React.FC = () => {
	const [purchaseAmount, setPurchaseAmount] = useState<string>('');
	const {
		web3,
		account,
		balance,
		hardCap,
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
							<p className="font-bold">{tokenBalance} SC</p>
						</div>
						<InputField
							type="number"
							placeholder="Enter ETH amount to purchase"
							className="w-full p-2 mb-2 border rounded"
							value={purchaseAmount}
							onChange={(e) => setPurchaseAmount(e.target.value)}
						/>
						<Button
							className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
							onClick={handlePurchase}
						>
							Purchase Tokens
						</Button>
						<div className="flex justify-between mb-1">
							<span className="text-base font-medium text-blue-700 dark:text-white">
								{tokenBalance} SC
							</span>
							<span className="text-base font-medium text-blue-700 dark:text-white">
								Hardcap : {hardCap}
							</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
							<div
								className="bg-blue-600 h-2.5 rounded-full"
								style={{
									width:
										(parseInt(tokenBalance) * 100) / parseInt(hardCap) + '%',
								}}
							></div>
						</div>
					</div>
				) : (
					<div className="text-center">
						<p className="mb-4">
							Connect your wallet to participate in the ICO
						</p>
						<Button className="btn btn-primary" onClick={connectWallet}>
							Connect Wallet
						</Button>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Ico;
