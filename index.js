const express = require('express');
const connectDb = require('./db/connection');
const { PORT } = require('./config')
const Task = require('./schemas/Task');
const State = require('./schemas/State');
const app = express();

connectDb();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.get('/Task', async function (req, res) {
    await Task.find({}, function (err, docs) {
        res.status(200).json({
            tasks: docs
        });
    });
});

app.get('/State', async function (req, res) {
    await State.find({}, function (err, docs) {
        res.status(200).json({
            states: docs
        })
    });
});

app.get('/', function (req, res) {
    res.status(200).json({
        message: 'Ruta por defecto'
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});