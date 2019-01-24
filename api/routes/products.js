const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
        cb(null, './uploads/');
   },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
  // reject file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept file
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
   storage: storage,
    limits: {
       // 5 mb limit
       fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', ProductsController.products_get_all);

router.get('/:productID', ProductsController.products_get_product);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productID', checkAuth, ProductsController.products_delete_product);

module.exports = router;
