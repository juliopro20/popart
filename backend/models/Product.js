const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  rentalPrice: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);