
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required:true
    },
    category:{ //These category has data type pf array , so we will define data type of these category has type: [] //Inside these array we have to define the data type of each value, i.e type: [ { type: String}], These category has only limited values, i.e for these column only among these values it should have to posses , that values we have to specify in enum, i.e type: [ {type:String, enum:['A','B']}]
        type:[{
            type:String,
            enum:["veg", "non-veg"]
        }]
    },
    image: {
        type:String
    },
    bestseller:{
        type:String
    },
    description:{
        type:String
    },
    //Now we have to define the relation among product to firm
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
})



//Lets export these product model
const Product = mongoose.model("Product", productSchema)

module.exports = Product

//Now lets define all crud functions on products table, in productController
