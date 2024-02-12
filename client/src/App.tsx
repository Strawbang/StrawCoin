import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './pages/Error404';
import Home from './pages/Home';
import Ico from './pages/Ico';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/ico" element={<Ico />} />
				<Route path="notfound" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/notfound" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
