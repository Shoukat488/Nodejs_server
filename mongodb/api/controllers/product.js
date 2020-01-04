const Product = require('../models/product');
const mongoose = require('mongoose');

exports.Product_get_products =  async (req, res , next)=>{
    try{
        const item = await Product.find().select('name price _id');
        if(item)
        {
            res.status(200).json({"data" : item,
            request: {
                Type: 'GET',
                url : "http://localhost:3001/product/"
            }
        })
        }
    }
    catch(err)
    {
        res.status(404).json({"error":err})
    }
}

exports.Product_post_product = async (req, res , next)=>{
    try
    {
        console.log(req.file);
        const product = new Product( {
            _id : mongoose.Types.ObjectId(),
            name : req.body.name,
            price : req.body.price
        })

        const item = await product.save();
        if(item)
        {
            res.status(200).json(
                {
                data: {
                    _id : item._id,
                    name : item.name,
                    price : item.price
                },
                request: {
                    Type: 'POST',
                    url : "http://localhost:3001/product/"
                }
            })
        }
    }
    catch(err)
    {
        res.status(404).json({'error':err})
    }

}

exports.Product_get_product = async (req, res , next)=>{

    try{
        const item = await Product.findById(req.params.productId);
        if(item)
        {
            res.status(200).json(
                {
                data: {
                    _id : item._id,
                    name : item.name,
                    price : item.price
                },
                request: {
                    Type: 'GET',
                    url : "http://localhost:3001/product/" + item._id
                }
            })
        }
    }
    catch(err)
    {
        res.status(404).json({"error":err})
    }

    res.status(500).json({"message":"Not Found"})

}

exports.Product_delete_product =  async (req , res , next)=>{
    try {
        const item = await Product.remove({'_id':req.params.productId});
        if(item)
        {
            res.status(200).json({"message":"deleted",
        data : {
                name : "string",
                price : 'number'
            },
            request: {
                Type: 'DELETE',
                url : "http://localhost:3001/product/" + req.params.productId
            }
        })
        }

    } catch (error) {
        res.status(404).json({"error":error})
    }
    res.status(500).json({"message":"Not Found"});
}

exports.Product_patch_product = async (req , res, next)=>{
    try {
        const newData = {} 
        for(key in req.body)
        {
            newData[key] = req.body[key];
        }

        const _id = req.params.productId;
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