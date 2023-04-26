const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleTimeString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}` );
    next();
};

app.use(express.json());

// MongoDB conenctivity
mongoose.connect('mongodb://localhost/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('connection established successfully extablished!'))
    .catch( err => console.log(err));

// Routes
app.use('todo', todoHandler);

// app.get('/aboutMiddleware', (req, res) => {
//     res.send("aboutMiddleware");
// });


app.listen(3939, () => {
    console.log('Listening to 3939');
})