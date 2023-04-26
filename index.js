const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();

app.use(express.json());

// MongoDB conenctivity
mongoose.connect('mongodb://localhost/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('connection established successfully!'))
    .catch( err => console.log(err));

// Routes
app.use('/todo', todoHandler);

app.listen(3939, () => {
    console.log('Listening to 3939');
})