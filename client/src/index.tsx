import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './hooks/WalletContext';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<WalletProvider>
			<App />
		</WalletProvider>
	</React.StrictMode>
);
reportWebVitals();
