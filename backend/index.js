'use strict'
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Routes
const listRoutes = require('./src/routes/list');

app.use(express.json());
app.use(cors());
app.use('/api/list', listRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Server is listening to PORT ${port}`)
);
