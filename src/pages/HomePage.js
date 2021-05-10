import React from 'react';
import './HomePage.css';
import firebase from '../firebase/firebase';
import { ExitToApp, Person } from '@material-ui/icons';
import { Button, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TodoCollection from '../components/TodoCollection';

const HomePage = ({ user }) => {
	return (
		<div id='homepage'>
			<div className='title-app-bar'>
				<div>
					<h1>Work TODOs!</h1>
				</div>
				<div className='appbar-buttons'>
					<button className='text-button'>
						<Icon>
							<Person />
						</Icon>
						<Link to='/'>{user.name}</Link>
					</button>
					<button
						onClick={() => firebase.auth().signOut()}
						className='text-button'
					>
						<Icon>
							<ExitToApp />
						</Icon>
						<Link to='/'>Sign Out</Link>
					</button>
				</div>
			</div>
			<div className='center-align'>
				<Link to='/create-list'>
					<Button variant='contained' color='primary'>
						Create A New List
					</Button>
				</Link>
			</div>
			<TodoCollection user={user} />
		</div>
	);
};

export default HomePage;
