import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/templates/DefaultLayout';

const HomePage: React.FC = () => {
	return (
		<DefaultLayout>
			<div className="container mx-auto p-8">
				<header className="text-center mb-8">
					<h1 className="text-5xl font-bold text-blue-500">
						Welcome to StrawCoin
					</h1>
					<p className="text-gray-600 text-lg mt-4">
						Empowering Decentralized Finance
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 transform duration-300 ease-in-out">
						<h2 className="text-xl font-bold mb-4">Participate in ICO</h2>
						<p className="text-gray-600">
							Acquire StrawCoin tokens in our Initial Coin Offering (ICO).
							Support the project and get involved in decentralized finance.
						</p>
						<Link
							to="/ico"
							className="text-blue-500 mt-4 inline-block hover:underline"
						>
							Learn more
						</Link>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 transform duration-300 ease-in-out">
						<h2 className="text-xl font-bold mb-4">StrawCoin Liquidity</h2>
						<p className="text-gray-600">
							Provide liquidity to StrawCoin and earn rewards. Contribute to the
							decentralized ecosystem and enhance liquidity pools.
						</p>
						<Link
							to="/stacking"
							className="text-blue-500 mt-4 inline-block hover:underline"
						>
							Get started
						</Link>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105 transform duration-300 ease-in-out">
						<h2 className="text-xl font-bold mb-4">Farm & Earn</h2>
						<p className="text-gray-600">
							Stake your StrawCoin tokens and earn rewards through our farming
							program. Join the farming community and grow your assets.
						</p>
						<Link
							to="/farm"
							className="text-blue-500 mt-4 inline-block hover:underline"
						>
							Explore farms
						</Link>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default HomePage;
