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

router.post('/deleteUser', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email and delete
        const user = await Master.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/editProduct', async (req, res) => {
    const { sku, availability, category, product_name, photo, description, price, weight, approval_sub, approval_master } = req.body;

    try {
        // Find the product by SKU
        const product = await Product.findOne({ sku });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update only the fields provided in the request
        const updatedFields = {};
        if (availability !== undefined) updatedFields.availability = availability;
        if (category !== undefined) updatedFields.category = category;
        if (product_name !== undefined) updatedFields.product_name = product_name;
        if (photo !== undefined) updatedFields.photo = photo;
        if (description !== undefined) updatedFields.description = description;
        if (price !== undefined) updatedFields.price = price;
        if (weight !== undefined) updatedFields.weight = weight;
        if (approval_sub !== undefined) updatedFields.approval_sub = approval_sub;
        if (approval_master !== undefined) updatedFields.approval_master = approval_master;

        await Product.updateOne({ sku }, { $set: updatedFields });

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/approveAdmin', async (req, res) => {
    const { _id } = req.body;

    try {
        // Find the product by _id
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update approval_sub to true
        product.approval_master = true;
        await product.save();

        res.status(200).json({ message: 'Product approval_master updated to true' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/rejectAdmin', async (req, res) => {
    const { _id } = req.body;

    try {
        // Find the product by _id
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update approval_sub to false
        product.approval_master = false;
        await product.save();

        res.status(200).json({ message: 'Product approval_master updated to true' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
