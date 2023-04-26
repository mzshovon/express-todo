const express = require('express');
const mongoose = require('mongoose');
const router = express.routerr();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo',todoSchema);


router.get('/', async(req, res) => {

});

router.get('/:id', async(req, res) => {

});

// Store a todo request
router.post('/', async(req, res) => {
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

router.post('/multiple', async(req, res) => {

});

router.put('/:id', async(req, res) => {

});

router.delete('/:id', async(req, res) => {

});

module.exports = router;