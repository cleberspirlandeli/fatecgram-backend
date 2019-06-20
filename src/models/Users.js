const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Number,
        default: 0
    },
}, {
        timestamps: true
    });

module.exports = mongoose.model('Users', UsersSchema);
