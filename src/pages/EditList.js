import React, { useEffect, useState } from 'react';
import { AddBox, DeleteForever, Person } from '@material-ui/icons';
import {
	Button,
	Icon,
	IconButton,
	TextField,
} from '@material-ui/core';
import firebase from '../firebase/firebase';
import { Link, Redirect } from 'react-router-dom';
import './CreateList.css';
import LoadingScreen from '../components/LoadingScreen';

const EditList = ({ match }) => {
	// Loading 'stop' stops the loading animation
	// 'start' starts the animation
	// 'redirect' redirects the page to the homepage after successfully storing data
	const [loading, setLoading] = useState('start');
	const [title, setTitle] = useState('');
	const [todoText, setTodoText] = useState('');
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const fetchTodoArray = async () => {
			const result = await fetch(
				'http://localhost:8000/api/list/getOne',
				{
					method: 'POST',
					body: JSON.stringify({
						uid: firebase.auth().currentUser.uid,
						listId: match.params.listId,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await result.json();
			if (!data.error && data !== null) {
				setTitle(data['title']);
				setTodos(data['todoArray']);
				setLoading('stop');
			}
			// Stop Loading after data request is completed
		};
		fetchTodoArray();
	}, [match.params.listId]);

	// Add todoText to todos array
	const addTodo = () => {
		const temp = [...todos];
		temp.push({ text: todoText, isComplete: false });
		setTodos(temp);
		setTodoText('');
	};
	// Delete a todo
	const deleteTodo = (index) => {
		// exclude the todo at the given index
		const temp = todos.filter((todo, i) => i !== index);
		setTodos(temp);
	};
	// send the data to the backend
	const onSaveList = async () => {
		setLoading('start');
		const result = await fetch(
			'http://localhost:8000/api/list/edit',
			{
				method: 'POST',
				body: JSON.stringify({
					uid: firebase.auth().currentUser.uid,
					title,
					todoArray: todos,
					listId: match.params.listId,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await result.json();
		if (!data.error) setLoading('redirect');
		else setLoading('stop');
	};

	const onCompleteToggle = (key) => {
		const temp = [...todos];
		temp[key].isComplete = !temp[key].isComplete;
		setTodos(temp);
	};
	// if loading status is start, display loading Screen
	if (loading === 'start') return <LoadingScreen />;
	// if loading status is redirect, redirect it to the homepage
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
						<Link to='/'>
							{firebase.auth().currentUser.displayName}
						</Link>
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
							<input
								type='checkbox'
								checked={todo.isComplete}
								onChange={() => onCompleteToggle(key)}
							/>
							<p className={todo.isComplete ? 'crossed' : ''}>
								{todo.text}
							</p>
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

export default EditList;
