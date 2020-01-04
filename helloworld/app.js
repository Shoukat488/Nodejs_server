var express = require("express")
var app = express();
var arr = ["Shoukat ali"]
const fs = require("fs");

// file reading - sync and async
// const content = fs.readFileSync('./read.txt',{encoding:"utf8"})
// console.log(content)

// const text = "We are going to write...something\n"
// file writing - asyn and sync
// fs.writeFileSync("./read.txt",text)

// fs.writeFile("./read.txt",text , (err)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     console.log("Successfuly written");
// })

// file appending

// fs.appendFile("./read.txt",text , (err)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     console.log("Successfuly written");
// })

// file deleting 

fs.unlinkSync("./tobeDeleted.txt");

// app.listen(3001 , function(){
//     console.log("connected")
// })
// function log(req , res , next) {
//     console.log("midleware")
//     next();
// }
// app.get('/users' , log , function (req , res) {
//     res.send(arr);
// })
// app.use((req, res , next)=>{})
// app.post('users' , log , function(req , res)
// {
//     let array = req.params;
//     res.send()
// })