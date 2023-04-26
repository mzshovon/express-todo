const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo',todoSchema);


router.get('/', async(req, res) => {
    try {
        let result = await Todo.find({}).select({ _id : 0, __v : 0}).limit(10);
        res.status(200).json({
            message : "TODO Data",
            data : result
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

router.get('/:id', async(req, res) => {
    try {
        let result = await Todo.find({_id : req.params.id}).select({ _id : 0, __v : 0});
        res.status(200).json({
            message : "TODO Data",
            data : result
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

// Store a todo request
router.post('/', async(req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(200).json({
            message : "Data Stored Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

router.post('/multiple', async(req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message : "Data Stored Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

router.put('/:id', async(req, res) => {
    try {
        await Todo.updateMany({_id : req.params.id}, {status : 'inactive'});
        res.status(200).json({
            message : "Data updated Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

router.delete('/:id', async(req, res) => {
    try {
        await Todo.deleteOne({_id : req.params.id});
        res.status(200).json({
            message : "Data deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

module.exports = router;