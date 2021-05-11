import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import SignIn from './pages/SignIn';
import firebase from './firebase/firebase';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import CreateList from './pages/CreateList';
import EditList from './pages/EditList';

const App = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		firebase.auth().onAuthStateChanged((user) => {
			if (user && isMounted) {
				setUser({
					uid: firebase.auth().currentUser.uid,
					name: firebase.auth().currentUser.displayName,
					email: firebase.auth().currentUser.email,
				});
				console.log('User Logged In');
			} else {
				console.log('User Signed Out');
				setUser({});
			}
			console.log('auth change');
			if (isMounted) setLoading(false);
		});
		return () => (isMounted = false);
	}, [setUser]);
	if (loading) return <LoadingScreen />;
	return !user.uid ? (
		<SignIn />
	) : (
		<Switch>
			<Route exact path='/create-list'>
				<CreateList user={user} />
			</Route>
			<Route exact path='/edit-list/:listId' component={EditList} />
			<Route path='/'>
				<HomePage user={user} />
			</Route>
		</Switch>
	);
};

export default App;
