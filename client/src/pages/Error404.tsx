import React from 'react';
import DefaultLayout from '../components/templates/DefaultLayout';

const NotFound: React.FC = () => {
	return (
		<DefaultLayout>
			<div className="flex flex-col items-center justify-center h-screen">
				<h2 className="text-4xl font-bold mb-4">404 Not Found</h2>
				<p className="text-gray-600">
					Sorry, the page you are looking for does not exist.
				</p>
			</div>
		</DefaultLayout>
	);
};

export default NotFound;
