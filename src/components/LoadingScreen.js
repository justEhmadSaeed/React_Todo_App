import React from 'react';
import Loader from 'react-loader-spinner';
import './LoadingScreen.css';

const LoadingScreen = () => {
	return (
		<div className='loading'>
			<h1>WORK TODOs</h1>
			<Loader color='#5FC6BB' width={130} height={130} type='Circles' />
		</div>
	);
};
export default LoadingScreen;
