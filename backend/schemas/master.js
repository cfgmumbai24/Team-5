const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

});

const master = mongoose.model('Admin', masterSchema);

module.exports = master;