import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import TodoList from './TodoList';

const TodoCollection = ({ user }) => {
	const [loading, setLoading] = useState(true);
	const [todoListArray, setTodoListArray] = useState([]);

	useEffect(() => {
		const fetchTodoArray = async () => {
			const result = await fetch(
				'http://localhost:8000/api/list/get',
				{
					method: 'POST',
					body: JSON.stringify({
						uid: user.uid,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await result.json();
			if (!data.error && data !== null) {
				setTodoListArray(data);
			}
			// Stop Loading after data request is completed
			setLoading(false);
		};
		fetchTodoArray();
	}, [user.uid]);

	if (loading) return <LoadingScreen />;

	return (
		<div className='grid'>
			{Object.values(todoListArray).map((todo, key) => (
				<TodoList
					key={key}
					title={todo.title}
					todos={todo.todoArray}
				/>
			))}
		</div>
	);
};

export default TodoCollection;
