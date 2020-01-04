const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkAuth = require('../midleware/auth');
const ProductController = require('../controllers/product');

const fileFilter = (req , file , cb)=>{

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null , true);
    else
    cb(null , false);

}

const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb( null , 'uploads/')
    },
    filename : (req , file , cb)=>{
        cb( null ,  file.originalname )
    }
})

const upload = multer({
    storage: storage,
    limits : 50,
    fileFilter : fileFilter
});

router.get('/', ProductController.Product_get_products);

router.post('/', checkAuth , upload.single('productImage'), ProductController.Product_post_product)

router.get('/:productId',ProductController.Product_get_product);

router.delete('/:productId', checkAuth , ProductController.Product_delete_product);

router.patch('/:productId', checkAuth , ProductController.Product_patch_product);

module.exports = router