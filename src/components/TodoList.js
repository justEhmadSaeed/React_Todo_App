import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import './TodoList.css';

const TodoList = ({ title, todos, listId, deleteList }) => {
	const incompleteTodos = todos.filter((item) => !item.isComplete);
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
				<Link to={`/edit-list/${listId}`}>
					<IconButton>
						<Edit />
					</IconButton>
				</Link>
			</div>
		</div>
	);
};

export default TodoList;
