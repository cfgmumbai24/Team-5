const mongoose = require('mongoose');
require('dotenv').config()

// Replace with your actual MongoDB connection string
const uri = process.env.ATLAS;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensures that the category name is unique
    },
    product_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    }
});

const Category = mongoose.model('Category', categorySchema);

// const categories = [
//     { name: 'Terracotta Ornaments & Home Décor', product_id: [] },
//     { name: 'Macrame Based Handicraft', product_id: [] },
//     { name: 'Moonj Based Handicrafts', product_id: [] },
//     { name: 'Banana Fiber based ornaments & Home Décor', product_id: [] },
//     { name: 'Jute Bags & Allied Products', product_id: [] }
// ];

// // Connect to MongoDB and insert categories
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//         return Category.insertMany(categories);
//     })
//     .then(docs => {
//         console.log('Categories added successfully:', docs);
//         mongoose.connection.close();
//     })
//     .catch(err => {
//         console.error('Error:', err);
//         mongoose.connection.close();
//     });

module.exports = Category;
