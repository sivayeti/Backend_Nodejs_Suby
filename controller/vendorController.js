
const Vendor = require("../model/Vendor")

const  bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const vendorRegister = async(req, res) => {

   try{
     const { username, email, password } = req.body

    //Lets prepare vendor Object with these fields , then save that object ,then all fields will form a record and save in vendors table

    //First verify the user exists in table , if user exists, then proceed with login
    const user = await Vendor.findOne({email})

    if(user){
         return res.status(202).json("Proceed with login")
    }

    //Lets hash the input password, and insert in vendors table, because password is confidential information
    const hashedPassword = await bcrypt.hash(password, 10) //using hash() function we can perform the hahsing on password, hahs(password_which_we_want_hash, how_many_times_we_have_to_apply_the_hashing_algorithm_on_password)
    const newVendor = new Vendor({
        username,
        email,
        password: hashedPassword
    })

    await newVendor.save() //Now these record is inserted into vendors table
    res.status(200).json("Vendor Registered Successfully")
   }
   catch(error){
    console.error(error)
    res.status(500).json("Internal Server Error")
   }
}


//Lets export these controller, we have to define a routing path for vendorRegister function, by using that routing path we can activate the vendorRegister function

const secretKey = process.env.WhatIsYourName

//Lets define the vendorLogin function
const vendorLogin = async(req, res) => {

    try{
        const { email, password } = req.body;

    const user = await Vendor.findOne({email});

    if(!user){
        return res.staus(500).json("User not exits, proceed with register")
    }

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(500).json("Password is incorrect")
    }

    const token = await jwt.sign({vendorId: user._id}, secretKey, {expiresIn: "1h"}) //using the sign() method in jwt we can generate the token on user._id, by decrypting it using secretkey
    // res.status(200).json("Login Successfull")
    console.log(token)
    res.status(200).json({message: "Login Successfull", token: token})
    }
    catch(error){
        console.error(error)
        res.status(500).json("Internal Server error")
    }
}

//getAllVendors function to retrieve all records from vendors table

const getAllVendors = async(req, res)=>{

   try{
     const vendors = await Vendor.find().populate('firm') //These find() method will retrieve all records from vendors table, and if we want to display their respective firm record, actually we have their respective firmId, then we have to specify the firm column/firmId in populate() method, which will retrieve that respective firm record

    res.status(200).json(vendors)
   }
   catch(error){
    console.error(error)
    res.status(500).json("Internal Server Error")
   }
}

//Get Vendor Record by Id
const getVendorById = async( req, res)=>{
   try{
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId).populate('firm');
    res.status(200).json(vendor)
   }
   catch(error){
    console.error(error)
    res.status(500).json("Internal Server Error")
   }

}
module.exports = { vendorRegister ,vendorLogin , getAllVendors, getVendorById}