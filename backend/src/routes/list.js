const router = require('express').Router();
const { database } = require('../firebase');

// Post Todo List
router.post('/set', (req, res) => {
	const { uid, title, todoArray } = req.body;
	if (uid && title && todoArray.length) {
		// convert todoList into a text, isComplete Object array
		const todoObjects = todoArray.map((todo) => {
			return { text: todo, isComplete: false };
		});
		const todoListRef = database.ref(`users/${uid}/TodoLists`).push();
		todoListRef.set(
			{
				title,
				todoArray: { ...Object(todoObjects) },
			},
			(error) => {
				if (error) return res.status(400).json(error);
				res.status(200).json({ message: 'Success' });
			}
		);
	} else
		res.status(400).json({ error: 'Required Fields are missing' });
});
// Get all todos
router.post('/get', (req, res) => {
	const { uid } = req.body;
	if (uid) {
		database
			.ref(`users/${uid}/TodoLists`)
			.once('value', (snapshot) => {
				if (snapshot.exists())
					return res.status(200).json(snapshot.val());
				else res.status(400).json({ error: 'Data Not Found!' });
			});
	} else
		res.status(400).json({ error: 'Required Fields are missing' });
});
// Get a single todo
router.post('/getOne', (req, res) => {
	const { uid, listId } = req.body;
	if (uid && listId) {
		database
			.ref(`users/${uid}/TodoLists/${listId}`)
			.once('value', (snapshot) => {
				if (snapshot.exists())
					return res.status(200).json(snapshot.val());
				else res.status(400).json({ error: 'Data Not Found!' });
			});
	} else
		res.status(400).json({ error: 'Required Fields are missing' });
});
// Edit A todo List
router.post('/edit', (req, res) => {
	const { uid, title, todoArray, listId } = req.body;
	if (uid && title && todoArray.length && listId) {
		database.ref(`users/${uid}/TodoLists/${listId}`).update(
			{
				title,
				todoArray: { ...Object(todoArray) },
			},
			(error) => {
				if (error) return res.status(400).json(error);
				res.status(200).json({ message: 'Success' });
			}
		);
	} else
		res.status(400).json({ error: 'Required Fields are missing' });
});
// Delete a Todo List
router.delete('/delete', (req, res) => {
	const { uid, listId } = req.body;
	if (uid && listId)
		database
			.ref(`users/${uid}/TodoLists/${listId}`)
			.remove()
			.then(() => res.status(200).json({ message: 'Success' }))
			.catch((err) => res.status(400).json(error));
	else res.status(400).json({ error: 'Required Fields are missing' });
});

module.exports = router;
