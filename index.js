const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// For routing
const app = express();

// For getting .env property
dotenv.config();

// For initializing form request property
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
app.use('/user', userHandler);

// Default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

// Initializing error handler
app.use(errorHandler);

// Listening to the port
app.listen(3939, () => {
    console.log('Listening to 3939');
})