const express = require('express')
const bcrypt = require('bcrypt')
const Master = require('../schemas/master')
const router = express.Router()
require('dotenv').config()
const Product = require('../schemas/product')
const Category = require('../schemas/category')

router.get('/', (req, res) => {
    return res.send('Auth route')
})

router.post('/register', async (req, res) => {
    const { name, email, password, category, role } = req.body

    try {
        const existingLogin = await Master.findOne({ email })
        if (existingLogin) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Master({ name, email, password: hashedPassword, category, role })
        await newUser.save()
        res.status(200).json({ message: 'Registration successful' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const login = await Master.findOne({ email })

        if (!login) {
            return res.status(404).json({ error: 'User doesn\'t exist' })
        }

        const isPasswordValid = await bcrypt.compare(password, login.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' })
        }

        res.status(200).json({ login })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/addCategory', async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name, product_id: [] });
        await newCategory.save();
        res.status(200).json({ message: 'Category added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/addProduct', async (req, res) => {
    const { sku, availability, category, product_name, photo, description, price, weight, approval_sub, approval_master } = req.body;

    try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        const newProduct = new Product({ sku, availability, category, product_name, photo, description, price, weight, approval_sub, approval_master });
        const savedProduct = await newProduct.save();

        // Add product ID to the category's product_id array
        categoryExists.product_id.push(savedProduct._id);
        await categoryExists.save();

        res.status(200).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getProductsmaster', async (req, res) => {
    try {
        const products = await Product.find({ approval_sub: true });
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getProductscat', async (req, res) => {
    try {
        const products = await Product.find({ approval_master: true });
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
