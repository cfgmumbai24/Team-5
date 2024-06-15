const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../schemas/user')
const router = express.Router()
const nodemailer = require('nodemailer');
require('dotenv').config()

router.get('/', (req, res) => {
    return res.send('Auth route')
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingLogin = await User.findOne({ email })
        if (existingLogin) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()
        res.status(200).json({ message: 'Registration successful' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const login = await User.findOne({ email })

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

async function sendEmail(email, quantity, sku, customerName, message) {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dhruvi1267.be21@chitkarauniversity.edu.in', 
            pass: process.env.MAIL
        }
    });
  
    // Define email options
    let mailOptions = {
        from: 'dhruvi1267.be21@chitkarauniversity.edu.in', 
        to: email, 
        subject: "Order Confirmation", 
        text: "Hello " + customerName + ",\n\nThank you for placing an order with us. Your order has been confirmed. The details of your order are as follows:\n\nSKU: " + sku + "\nQuantity: " + quantity + "\n\n" + message + "\n\nThank you for shopping with us.\n\nRegards,\nTeam JPMMSS."
    };
  
    // Send email
    await transporter.sendMail(mailOptions);
}

router.post('/mail', async (req, res) => {
    const { email, quantity, sku, customerName, message } = req.body;
  
    try {
        // Call the sendEmail function with the provided parameters
        await sendEmail(email, quantity, sku, customerName, message);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
