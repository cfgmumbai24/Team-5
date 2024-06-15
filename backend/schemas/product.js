const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;