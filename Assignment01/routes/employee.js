const express = require('express');
const router = express.Router();
const path = require('path')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// app.get("employees", async(req,res)=>{
//     const emp = await employeeModel.find(
//         {total:{$gt:100}},"first_name total").sort({total:-1})
//     try{
//         res.send(emp)
//     }catch(err){
//         console.log("Error: " + err)
//         res.status(500).send(err)
//     }
// })