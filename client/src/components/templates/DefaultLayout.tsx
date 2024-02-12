import React, { ReactNode } from 'react';
import Footer from '../molecules/Footer';
import NavBar from '../molecules/Navbar';

interface DefaultLayoutProps {
	children?: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<div>
			<NavBar />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
