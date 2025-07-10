
//Lets we have to decrypt the jwt and identify the vendorId: vendor._Id, and we have to define a variable in req i.e req.vendorId , and assign the decrypted value of Jwt vendorId: vendor._id

const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")

dotEnv.config()

const secretKey = process.env.WhatIsYourName;
const verifyToken = async(req, res, next) => {

   try{
     const token = req.headers.token;

    if(!token){
        return res.status(500).json("Token is not valid")
    }

    //we have to decrypt the token , with the function verify(), and also the same secretKey, which we used for encrypting the vendor._id
    const decodedToken = await jwt.verify(token, secretKey)
    console.log(decodedToken.vendorId)
    req.vendorId = decodedToken.vendorId;

    next()
   }
   catch(error){
    console.error(error)
   }

}

//Lets export these middleware to use in other code files
module.exports =  verifyToken;
