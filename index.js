const express = require('express');
const connectDb = require('./db/connection');
const { PORT } = require('./config')
const Task = require('./schemas/Task');
const State = require('./schemas/State');
const cors = require('cors');
const app = express();

connectDb();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.get('/Task', async function (req, res) {
    await Task.find({}, function (err, docs) {
        res.status(200).json({
            tasks: docs
        });
    });
});

app.post('/Task', async function (req, res) {
    const { description, state } = req.body;
    let task = new Task({
        description,
        state
    })
    task.save(function (err, doc) {
        res.status(201).send(doc);
    });
});

app.put('/Task/:id', async function (req, res) {
    const id = req.params["id"];
    const payload = req.body;
    await Task.findByIdAndUpdate({ _id: id }, payload, { new: true }, function (err, task) {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'No se pudo actualizar la tarea',
                error: err
            });
        }
        res.status(200).send(task);
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