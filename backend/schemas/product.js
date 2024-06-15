const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: {
        type: String
    },
    availability: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    product_name: {
        type: String
    },
    photo: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    weight: {
        type: String
    },
    approval_sub: {
        type: Boolean
    },
    approval_master: {
        type: Boolean
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;