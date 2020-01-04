const Order = require('../models/order');
const mongoose = require('mongoose');
const Product = require('../models/product');

exports.Order_get_order_s = (req,res ,next) =>{
    Order.find(req.params.id)
    .select('_id productId quantity')
    .populate('product' , '_id name price quantity')
    .then(doc=>{
        if(!doc)
        res.status(404).json({"message" : "Not found"});

        res.status(200).json({
            data: doc,
            request : {
                type : 'GET',
                url: "http://localhost:3001/order/" + req.params.id
            }
        });
    })
    .catch(err=>{
        res.status(500).json({error : err});
    })
}

exports.Order_post_order =  async (req,res ,next) =>{
    try {
        const productItem = await Product.findById(req.body.product);
        if(productItem)
        {
            const order = new Order({
                _id : mongoose.Types.ObjectId(),
                product : productItem._id,
                quantity : req.body.quantity
                }) ;
            const newItem = await order.save();
            if(newItem)
             res.status(200).json(
                {order,
                 request : {
                     type : 'POST',
                     url: "http://localhost:3001/order/"
                 }
             })
        }
        else
        {
            console.log("Product : ", productItem)
            res.status(500).json({"message" : "Product Not Found"})   
        }
    } catch (err) {
        console.log('error')
        res.status(404).json({
            error : err 
        })
    }
}

exports.Order_delete_order =  async (req,res ,next)=>{
    try {
        const item = await Order.remove({'_id':req.params.orderId});
        if(item)
        {
            res.status(200).json({"message":"deleted",
        data: {
                prodcut : "string",
                quantity : 'number'
            },
            request: {
                Type: 'DELETE',
                url : "http://localhost:3001/order/" + req.params.orderId
            }
        })
        }
    } catch (error) {
        res.status(404).json({"error":error})
    }
    res.status(500).json({"message":"Not Found"});
}

exports.Order_patch_order = async (req , res , next)=>{
    try {
        const newData = {} 
        for(key in req.body)
        {
            newData[key] = req.body[key];
        }

        const _id = req.params.orderId;
        const item = await Product.update({_id:_id},{ $set:newData});

        if(item)
        {
            res.status(200).json(
                {
                dataField: newData,
                request: {
                    Type: 'PATCH',
                    url : "http://localhost:3001/product/" + item._id
                }
            })
        }

    } catch (error) {
        res.status(404).json({"error":error})
    }
    res.status(500).json({"message":"Not Found"});

}

