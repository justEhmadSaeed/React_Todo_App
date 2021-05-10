import { Icon, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import './TodoList.css';

const TodoList = ({ title, todos, listId, deleteList }) => {
	console.log(listId);
	const incompleteTodos = todos.filter((item) => !item.isCompleted);
	const completedTodos = todos.length - incompleteTodos.length;

	return (
		<div className='todo-list'>
			<div>
				<h3>{title}</h3>
				<ul>
					{
						// if todos exist, then filter incomplete todos and map them
						todos ? (
							incompleteTodos.map((item, key) => (
								<li key={key}>{item.text}</li>
							))
						) : (
							<></>
						)
					}
				</ul>
				{completedTodos > 0 ? (
					<div className='checked-items'>
						+ {todos.length - incompleteTodos.length} checked items
					</div>
				) : (
					<></>
				)}
			</div>
			<div className='todo-footer'>
				<IconButton onClick={() => deleteList(listId)}>
					<Delete />
				</IconButton>
				<IconButton>
					<Edit />
				</IconButton>
			</div>
		</div>
	);
};

export default TodoList;
