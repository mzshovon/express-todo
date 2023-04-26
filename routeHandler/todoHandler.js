const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo',todoSchema);


route.get('/', async(req, res) => {

});

route.get('/:id', async(req, res) => {

});

// Store a todo request
route.post('/', async(req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if(err) {
            res.status(500).json({
                message : "There is a internal server error"
            })
        } else {
            res.status(200).json({
                message : "Data Stored Successfully"
            })
        }
    })
});

route.post('/multiple', async(req, res) => {

});

route.put('/:id', async(req, res) => {

});

route.delete('/:id', async(req, res) => {

});

module.exports = route;