const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    photo: {
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
        type: String,
        required: false
    },
    approval_sub: {
        type: Boolean,
        required: true
    },
    approval_master: {
        type: Boolean,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;