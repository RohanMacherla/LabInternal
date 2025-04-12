const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/sampledb")
    .then(()=>console.log("Database conneted"))
    .catch((err)=>{"Failed to connect",err})

const userSchema=({
    "name":{type:String},
    "email":{type:String},
    "password":{type:String}
})
const user = mongoose.model('user',userSchema)
const productSchema = ({
    "id":{type:Number},
    "name":{type:String},
    "description":{type:String},
    "price":{type:Number},
    "category":{type:String},
    "Stock":{type:Number}
})
const product = mongoose.model('product',productSchema)
app.get('/products',(res,req)=>{
    product.find(res.body)
        .then((data)=>{
            console.log("Data fetched successfully",data)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.post('/products',(req,res)=>{
    const newProduct = new product(req.body)
    newProduct.save()
        .then((data)=>{
            console.log("Data saved successfully")
            res.send(data)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.get('/products/:id',(req,res)=>{
    product.findById(req.params.id==req.body.id)
        .then((data)=>{
            console.log("Data fetched successfully",data)
            res.send(data)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.put('/Products/:id',(req,res)=>{
    product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then((data)=>{
            console.log("Data added",data)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.delete('/Products/:id',(req,res)=>{
    product.findByIdAndDelete(req.params.id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.listen(2000,()=>{
    console.log("Server is running on port 2000")
})
