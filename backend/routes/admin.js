const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const Master = require('../schemas/master')
const router = express.Router()
require('dotenv').config()
const Product = require('../schemas/product')
const Category = require('../schemas/category')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
const readFile = util.promisify(fs.readFile);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

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

router.get('/getUser', async (req, res) => {
    try {
        const users = await Master.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getCategories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
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

router.get('/getProducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/updateProduct', async (req, res) => {
    const { _id, product_name, description, qty, photo, weight } = req.body;
    try {
        const result = await Product.findByIdAndUpdate(_id, {
            product_name,
            description,
            qty,
            photo,
            weight,
        }, { new: true });

        if (!result) {
            return res.status(404).send('Product not found');
        }

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Error updating product');
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
    const { _id, sku, availability, category, product_name, photo, description, price, weight, approval_sub, approval_master } = req.body;

    try {
        // Find the product by SKU
        const product = await Product.findOne({ _id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update only the fields provided in the request
        const updatedFields = {};
        if (sku !== undefined) updatedFields.sku = sku;
        if (availability !== undefined) updatedFields.availability = availability;
        if (category !== undefined) updatedFields.category = category;
        if (product_name !== undefined) updatedFields.product_name = product_name;
        if (photo !== undefined) updatedFields.photo = photo;
        if (description !== undefined) updatedFields.description = description;
        if (price !== undefined) updatedFields.price = price;
        if (weight !== undefined) updatedFields.weight = weight;
        if (approval_sub !== undefined) updatedFields.approval_sub = approval_sub;
        if (approval_master !== undefined) updatedFields.approval_master = approval_master;

        await Product.updateOne({ _id }, { $set: updatedFields });

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

        res.status(200).json({ message: 'Product approval_master updated to false' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/upload-image', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { availability, category, product_name } = req.body;

        // Read the file and compress it
        const compressedBuffer = await sharp(req.file.path)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // Convert the compressed image to Base64
        const base64String = compressedBuffer.toString('base64');

        // Create a new product with the Base64 image
        const newProduct = new Product({
            availability,
            category,
            product_name,
            photo: base64String,
            approval_sub: "false",
            approval_master: "false"
        });

        // Save the product to the database
        await newProduct.save();

        res.status(200).json({ message: 'Product created and image uploaded successfully', product: newProduct });
    } catch (error) {
        console.error('Error occurred:', error);  // Log the error details
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
