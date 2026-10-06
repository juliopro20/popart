const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload, cloudinary } = require('../middleware/cloudinaryConfig');
const { verifyAdmin } = require('../middleware/authMiddleware'); // Make sure this is imported

// Get all products (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

// Admin: Create a new product with image upload (Protected)
router.post('/', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, purchasePrice, rentalPrice, category, inStock } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const newProduct = new Product({
      title,
      description,
      purchasePrice: Number(purchasePrice),
      rentalPrice: Number(rentalPrice),
      category,
      imageUrl: req.file.path,
      cloudinaryPublicId: req.file.filename,
      inStock: inStock !== undefined ? inStock : true,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Admin: Delete product and its Cloudinary image (Protected)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(product.cloudinaryPublicId);

    // Delete document from MongoDB
    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;