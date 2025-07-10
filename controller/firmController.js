
//Here define a addFirm function that which will insert the firmdetails into firms table
//Based on the decrypting jwt token, we can identify the user,  Based on that under respective user who are login and adding the firm, under that user, we can add that firm Id

const Firm = require("../model/Firm")

const Vendor = require("../model/Vendor")

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.extname(file.originalname) );
    }
    }); 
    const upload = multer({ storage: storage});




const addFirm = async( req, res) => {

    try{
        const {firmName, area, category, region, offer } = req.body;
    const image = req.file? req.file.filename: undefined;

    const vendor = await Vendor.findById(req.vendorId)

    //Lets create a object for firm with these info
    const newFirm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor: vendor._id
    })

    const savedFirm = await newFirm.save(); //Now the above object was saved into the firms table
    //Now we have to add the firm the respective vendor
    vendor.firm.push(savedFirm); //Now save these updated vendor Record in vendors table

    vendor.save();
    res.status(200).json("Firm Added Successfully")
    }
    catch(error){
        console.error(error)
        res.status(500).json("Internal Server Error")
    }





}


//Lets develop a function to delete the firm
const deleteFirmById = async(req, res) => {
    try{
        const firmId = req.params.firmId;

    const deletedFirm = await Firm.findByIdAndDelete(firmId)

    if(!deletedFirm){
        return res.status(404).json("No firm found")
    }

    res.status(200).json("Firm Deleted Successfully")
    }
    catch(error){
        console.error(error)
        res.status(404).json({error: "Internal Server Error"})
    }
}
//Lets export these addFirm function, to define the routing path for it which will activates these function

module.exports = { addFirm, deleteFirmById }