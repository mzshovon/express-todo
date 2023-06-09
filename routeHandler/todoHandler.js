const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const userSchema = require('../schemas/userSchema');
const userVerificationMiddleware = require('../middlewares/userVerificationMiddleware');
const Todo = new mongoose.model('Todo',todoSchema);
const User = new mongoose.model('User',userSchema);


router.get('/', userVerificationMiddleware, async(req, res) => {
    try {
        let result = await Todo.find({}).populate("user", "name username -_id").select({ _id : 0, __v : 0}).limit(10);
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

router.get('/inactiveList', userVerificationMiddleware,  async(req, res) => {
    try {
        const todo = new Todo();
        const result = await todo.findInactive();
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

router.get('/:id', userVerificationMiddleware,  async(req, res) => {
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
router.post('/', userVerificationMiddleware, async(req, res) => {
    try {
        const newTodo = new Todo({
            ...req.body,
            user : req.userId
        });
        const insertTodo = await newTodo.save();
        if (insertTodo) {
            await User.updateOne({
                _id : req.userId
            }, {
                $push : {
                    todo : insertTodo._id
                }
            });
        }
        res.status(200).json({
            message : "Data Stored Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

router.post('/multiple', userVerificationMiddleware, async(req, res) => {
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

router.put('/:id', userVerificationMiddleware, async(req, res) => {
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

router.delete('/:id', userVerificationMiddleware, async(req, res) => {
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