
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.User_post_signup = async (req , res , next) => {
    try{
       const item = await User.find({email : req.body.email});
       if(item)
       {
           if(item.length >= 1)
           {
               return res.status(500).json({message : "User exits"})
           }
           else
           {
               bcrypt.hash(req.body.password , 10 , async (err , hash)=>{
                   if(err)
                   {
                       res.status(500).json({
                           error : err
                       })
                   }
                   else
                   {
                       try
                       {
                           const user = User({
                               _id : mongoose.Types.ObjectId(),
                               email: req.body.email,
                               password : hash
                           });
                           const result = await  user.save();
                           if(result)
                           {
                               console.log(result);
                               return res.status(201).json({"message" : "user added", result})
                           }
                       }
                       catch(err)
                       {
                           return res.status(404).json({error : err})
                       }
                   }
               })
           }
       }
       }
       catch(err)
       { 
           console.log("error")
           return res.status(404).json({error : err})
       }
   }


exports.User_delete_user = (req , res ,next)=>{
    User.remove({'_id' : req.params.userId})
    .exec()
    .then(result=>{
        return res.status(200).json({"message ": "user Deleted"})
    })
    .catch(err=>{
        
        return res.status(404).json({error: err})
    })
}

exports.User_login_user = ( req , res , next)=>{
    User.find({email: req.body.email})
    .then(users =>{

        if(users.length >= 1)
        {
            bcrypt.compare(req.body.password , users[0].password , (err ,result) =>{
                if(err)
                return res.status(500).json({"messsage":"Auth Failed 1"});
                
                if(result)
                {
                        const token = jwt.sign({
                            email: users[0].email,
                            _id : users[0]._id
                        },
                        'secret', // will use process.env.JWT_KEY
                        {
                            expiresIn: '1h'
                        });

                        return res.status(200).json(
                        {"message": "Auth Successfull",
                         token :token
                        });
                }	
                return res.status(500).json({"messsage":"Auth Failed 2 "});
            })
        }
        else
        return res.status(500).json({"messsage":"Auth Failed 3"});

    })  
    .catch(err=>{
        return res.status(500).json({error : err});
    })  
}
