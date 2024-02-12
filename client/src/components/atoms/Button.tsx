import React from 'react';

interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<button
			className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
