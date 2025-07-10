
const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }]
})
//Based on these schema the vendors table will be created in mongodb

//Lets export these vendorSchema , then we can use the Vendor model in other code files

const Vendor = mongoose.model('Vendor', vendorSchema)

module.exports = Vendor
//On these Vendor/vendors table we have to perform the insertion, with request fields username, email, password, which is called vendor Registration
