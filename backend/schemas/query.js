const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuerySchema = new Schema({
  sku: { type: Array, required: true },
  quantity: { type: Array, required: true},
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', QuerySchema);
