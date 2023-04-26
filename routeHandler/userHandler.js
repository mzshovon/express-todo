const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User',userSchema);


router.post('/signup', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            name : req.body.name,
            username : req.body.username,
            password : hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message : "User Registered Successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

router.post('/login', async(req, res) => {
    try {
        const findUser = await User.find({username: req.body.username});
        if(findUser && findUser.length > 0) {
            const validPassword = await bcrypt.compare(req.body.password, findUser[0].password);
            if(validPassword) {
                res.status(200).json({
                    message : "User Logged in Successfully"
                });
            } else {
                res.status(403).json({
                    message : "Wrong username or password"
                })
            }
        } else {
            res.status(403).json({
                message : "No user found for this username"
            })
        }
    } catch (err) {
        res.status(500).json({
            message : err
        })
    }
});

module.exports = router;