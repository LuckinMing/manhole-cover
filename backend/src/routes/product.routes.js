const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { auth, adminAuth } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { validate, productSchemas } = require('../middleware/validation.middleware');

// 公开路由
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// 需要认证的路由
router.post('/', 
    auth, 
    upload.array('images', 5), 
    validate(productSchemas.create), 
    productController.createProduct
);
router.patch('/:id', 
    auth, 
    upload.array('images', 5), 
    validate(productSchemas.update), 
    productController.updateProduct
);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
