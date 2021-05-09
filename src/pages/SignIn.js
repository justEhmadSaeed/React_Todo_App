import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from '../firebase/firebase';
import './SignIn.css'

const SignIn = () => {
	const uiConfig = {
		signInflow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	};
	return (
		<div id='signin-container'>
			<div id='signin-body'>
				<div id='login-card'>
					<label className='login-label'>
						<b>WORK TODOs</b>
					</label>
					<StyledFirebaseAuth
						borderRadius='40px'
						uiConfig={uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
