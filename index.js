require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { User, Connection, Post, GetFeed } = require('./routes/index');
const { appConnection } = require('./utils/appConnection');

const app = express();
const PORT = process.env['PORT'];
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the server of Social - Social Media App.")
});

app.use('/user', User);

app.use('/post', Post);

app.use('/connection', Connection);

app.use('/getFeed', GetFeed);

app.use('*', (req, res) => {
    res.status(404).send("Error 404 - Page not found.")
});

app.listen(PORT, () => appConnection(PORT));