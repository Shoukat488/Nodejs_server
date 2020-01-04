const express = require('express');
const router = express.Router();

router.get('/',(req, res , next)=>{
    res.status(200).json({"message" : "product details"})
    res.end()
})

router.post('/',(req, res , next)=>{
    const product = {
        productId : req.body.productId,
        price : req.body.price
    }

    res.status(200).json({
        "message" : "product sent" ,
        "data" : product
})
})

router.get('/:productId',(req, res , next)=>{
    if(req.params.productId == 'special')
    res.status(200).json({"message" : "product is special" , id})
    else
    res.status(200).json({"message" : "product is recieved" , id})
    res.end()

})

module.exports = router