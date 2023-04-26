const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type : String
    },
    status : {
        type : String,
        enum : ['active', 'inactive']
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = userSchema;