const express = require('express');
const morgan = require('morgan');
const bodyPardser = require('body-parser');

const app = express();
const productRouter = require('./api/router/product');
const orderRouter = require('./api/router/orders');

app.use(morgan('dev'));
app.use(bodyPardser.urlencoded({extended:true}));
app.use(bodyPardser.json());

// CROSS
app.use((req, res , next)=>{
    res.header("Access-Control-Allow-Origin",'*');// instead of '*' can also use
    res.header("Access-Control-Allow-Headers",
    'Origin , X-Requested-With , Content-Type , Accept, Authorization' ) // '*' for all

    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods" ,'GET, POST , PATCH, PUT ,DELETE');
        return res.status(200).json({})
    }

    next();
})

app.use('/order',orderRouter);
app.use('/product',productRouter );

app.use((req,res, next)=>{
    const error = new Error('Not found ');
    error.status = 404;
    next(error);
})

app.use((error ,req ,res ,next)=>{
    res.status(error.status || 500);
    res.json({
        error: error.message
    })
})

module.exports = app;
