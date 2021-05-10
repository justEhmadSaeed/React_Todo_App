import React from 'react';
import TodoList from './TodoList';
const todo = [
	{ text: 'Hello there!', isCompleted: false },
	{ text: 'Hello there!', isCompleted: true },
	{ text: 'Hello there!', isCompleted: false },
	{ text: 'Hello theadawre!', isCompleted: false },
	{ text: 'Hello there!', isCompleted: true },
	{ text: 'Hello there!', isCompleted: false },
	{ text: 'Hello there!', isCompleted: false },
	{ text: 'Hello thereawdwa!', isCompleted: false },
	{ text: 'Hello there!', isCompleted: false },
	{ text: 'Hello there!', isCompleted: true },
	{ text: 'Hello there!', isCompleted: false },
	{ text: 'Hello there!', isCompleted: false },
];
const TodoCollection = ({ user }) => {
	return (
		<div className='grid'>
			<TodoList title='Hello There!' todos={todo} />
			<TodoList title='Hello There!' todos={todo} />
			<TodoList title='Hello There!' todos={todo} />
		</div>
	);
};

export default TodoCollection;
