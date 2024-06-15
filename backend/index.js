const express = require("express")
const app = express()
require('dotenv').config()
const cors = require("cors");
const bodyParser = require('body-parser')
require('./connection')

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const authRouter = require('./routes/auth')

app.use('/auth',authRouter)

app.listen(process.env.PORT, () => { console.log(`Working On Port ${process.env.PORT}`) })