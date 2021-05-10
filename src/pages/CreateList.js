import React, { useState } from 'react';
import { AddBox, DeleteForever, Person } from '@material-ui/icons';
import {
	Button,
	Icon,
	IconButton,
	TextField,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import './CreateList.css';
import LoadingScreen from '../components/LoadingScreen';

const CreateList = ({ user }) => {
	// Loading 'stop' stops the loading animation
	// 'start' starts the animation
	// 'redirect' redirects the page to the homepage after successfully storing data
	const [loading, setLoading] = useState('stop');
	const [title, setTitle] = useState('');
	const [todoText, setTodoText] = useState('');
	const [todos, setTodos] = useState([]);
	// Add todoText to todos array
	const addTodo = () => {
		const temp = [...todos];
		temp.push(todoText);
		setTodos(temp);
		setTodoText('');
	};

	const deleteTodo = (index) => {
		// exclude the todo at the given index
		const temp = todos.filter((todo, i) => i !== index);
		setTodos(temp);
	};
	const onSaveList = async () => {
		setLoading('start');
		const result = await fetch('http://localhost:8000/api/list/set', {
			method: 'POST',
			body: JSON.stringify({
				uid: user.uid,
				title,
				todoArray: todos,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await result.json();
		if (!data.error) setLoading('redirect');
		else setLoading('stop');
	};

	// if loading status is start, display loading Screen
	// if loading status is redirect, redirect it to the homepage
	if (loading === 'start') return <LoadingScreen />;
	if (loading === 'redirect') return <Redirect push to='/' />;
	// else display the current screen
	return (
		<div id='create-list'>
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
				</div>
			</div>
			<div className='card'>
				<div className='input-bars'>
					<TextField
						margin='normal'
						type='text'
						variant='outlined'
						label='List Title'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						fullWidth
						autoFocus
						autoComplete='off'
					/>
				</div>
				<h2>TODOs</h2>
				<div className='add-todo'>
					<TextField
						type='text'
						variant='filled'
						label='Todo'
						value={todoText}
						onChange={(e) => {
							setTodoText(e.target.value);
						}}
						autoComplete='off'
						size='medium'
					/>
					<IconButton
						disabled={todoText.length === 0}
						onClick={addTodo}
					>
						<AddBox />
					</IconButton>
				</div>
				<div className='added-todos'>
					{todos.map((todo, key) => (
						<div className='todo-item' key={key}>
							<p>{todo}</p>
							<IconButton onClick={() => deleteTodo(key)}>
								<DeleteForever />
							</IconButton>
						</div>
					))}
				</div>
			</div>
			<div className='button-class'>
				<Button
					variant='contained'
					disabled={title.length === 0 || todos.length === 0}
					onClick={onSaveList}
					color='primary'
				>
					Save List
				</Button>
			</div>
		</div>
	);
};

export default CreateList;
