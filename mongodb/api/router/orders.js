const express = require('express');
const router = express.Router();
const checkAuth = require('../midleware/auth');

const OrderController = require('../controllers/order');

router.get('/:id?', checkAuth ,OrderController.Order_get_order_s);

router.post('/', checkAuth , OrderController.Order_post_order);

router.delete('/:orderId', checkAuth , OrderController.Order_delete_order );

router.patch('/:orderId' , checkAuth ,OrderController.Order_patch_order )

module.exports = router