const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    weight: {
        type: Array,
        required: false
    }
});

const Master = mongoose.model('Master', masterSchema);

module.exports = Master;