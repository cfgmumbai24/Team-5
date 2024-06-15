const express = require('express')
const bcrypt = require('bcrypt')
const Master = require('../schemas/master')
const router = express.Router()
require('dotenv').config()
const Product = require('../schemas/product')
const Category = require('../schemas/category')

router.post('/approveSub', async (req, res) => {
    const { _id } = req.body;

    try {
        // Find the product by _id
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update approval_sub to true
        product.approval_sub = true;
        await product.save();

        res.status(200).json({ message: 'Product approval_sub updated to true' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/rejectSub', async (req, res) => {
    const { _id } = req.body;

    try {
        // Find the product by _id
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update approval_sub to false
        product.approval_sub = false;
        await product.save();

        res.status(200).json({ message: 'Product approval_sub updated to true' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;