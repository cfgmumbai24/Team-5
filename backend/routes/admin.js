const express = require('express')
const bcrypt = require('bcrypt')
const Master = require('../schemas/master')
const router = express.Router()
require('dotenv').config()

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

module.exports = router;
