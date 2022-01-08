const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productData: { type: Object, required: true }
});

const user = mongoose.model("Product", productSchema);

module.exports = user;