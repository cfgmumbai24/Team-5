const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product_id: {
        type: Array,
        required: true
    }
});

const category = mongoose.model('Category', categorySchema);

module.exports = category;