import { Icon } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import './TodoList.css';

const TodoList = ({ title, todos }) => {
	const incompleteTodos = todos.filter((item) => !item.isCompleted);
	const completedTodos = todos.length - incompleteTodos.length;
	return (
		<div className='todo-list'>
			<h3>{title}</h3>
			{
				// if todos exist, then filter incomplete todos and map them
				todos ? (
					incompleteTodos.map((item, key) => (
						<div key={key}>{item.text}</div>
					))
				) : (
					<div></div>
				)
			}
			{completedTodos > 0 ? (
				<div className='checked-items'>
					+ {todos.length - incompleteTodos.length} checked items
				</div>
			) : (
				<></>
			)}
			<div className='todo-footer'>
				<Icon>
					<Edit />
				</Icon>
				<Icon>
					<Delete />
				</Icon>
			</div>
		</div>
	);
};

export default TodoList;
