const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Gadget = require('./gadget');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    wishlist : [
        {
            gadget_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Gadget'},
            created_At :{type: Date, required: true, default: Date.now}
        }
    ]
}, { timestamps: true});

userSchema.virtual('password').set(function(password){
    this.hashed_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hashed_password);
    }
}

module.exports = mongoose.model("User", userSchema);





// username: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     index: true,
//     lowercase: true
// },