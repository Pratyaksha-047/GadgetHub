const mongoose = require('mongoose');
const Gadget = require('./gadget');
const User = require('./user');

const gad_reviewSchema = new mongoose.Schema({
    gadget_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Gadget'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    rating : {
        type: Number
    },
    review : {
        type: String
    }
});

module.exports = mongoose.model("Gadget_review", gad_reviewSchema);