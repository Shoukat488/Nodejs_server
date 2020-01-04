const express = require('express');
const router = express.Router()


router.get('/',(req,res ,next)=>{
    res.status(200).json({"message":"get order"})
})

router.get('/:id',(req,res ,next)=>{
    res.status(200).json({"message":req.params.id})
})

router.post('/',(req,res ,next)=>{

    const order = {
        orderId: req.body.orderId,
        quantity : req.body.quantity
    }

    res.status(200).json({
        "message":"post order",
        "data": order
    })
})

router.delete('/',(req,res ,next)=>{
    res.status(200).json({"message":"delete order"})
})

module.exports = router