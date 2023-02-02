const express = require('express');
const router = express.Router();

// controller imports
const productController = require('../controllers/products');


router.get('/add-product', productController.getAddProduct);
// productController.getAddProduct()  <---- don't do this as it executes the function.
// productController.getAddProduct <---- This is the right way of adding function reference to this route.

router.post('/add-product', productController.postAddProduct);

exports.routes = router;
