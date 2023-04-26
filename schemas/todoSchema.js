const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : String,
    status : {
        type : String,
        enum : ['active', 'inactive']
    },
    date : {
        type : Date,
        default : Date.now
    }
});

todoSchema.methods = {
    findInactive : function() {
        return mongoose.model("Todo").find({status : 'inactive'}).select({
            _id : 0,
            __v : 0,
        })
    },
}

module.exports = todoSchema;