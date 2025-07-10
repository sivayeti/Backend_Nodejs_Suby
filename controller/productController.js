

const Product = require("../model/Product")

const multer = require("multer")
const path = require("path");
const Firm = require("../model/Firm");

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.extname(file.originalname) );
    }
    }); 
    const upload = multer({ storage: storage});

const addProduct = async(req, res) => {
    try{
        const {productName , price, category, bestseller, description } = req.body;
    const image = req.file? req.file.filename: undefined;
   // const image = req.file? req.file.filename: undefined;
   
   //Based on the firm ID, we can retrieve the firm, to that firm we can add these resepctive product
   const firmId = req.params.firmId //In before, to add the firm under vendor, we retrieved the vendor, by vendorId, we get the vendorId by decrypting the jwt token
                                    //But here, we are getting the firmId, from request.params, based on these firmID, we are retrieving the firm
    const firm = await Firm.findById(firmId)                                                          
   
    if(!firm){
        return res.status(404).json({error: "No firm found"});
    }


    const product = new Product({
     productName,
     price,
     category,
     image,
     bestseller,
     description,
     firm: firm._id
   })


   const savedProduct = await product.save(); //Now based on the req.product details, the record was saved in products table

   firm.product.push(savedProduct); //updated the current firm with respective product by adding
   //Now save the updated firm
   
   await firm.save();

   res.status(200).json({message:`Product ${productName} Added to firm ${firm.firmName} Successfully`, savedProduct})
    }
    catch(error){
        console.error(error)
        res.status(500).json("Internal Server Error")
    }

   
}

//Lets define a function to retrieve/get all the products based on firmID
const getProductsbyFirmId = async(req, res) => {

    try{
        const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId).populate('product')
    res.status(200).json(firm);
    }
    catch(error){
        console.error(error)
        res.status(500).json("Internal Server Error")
    }

}


 const getProductByFirm = async(req, res) => {
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        
        if(!firm){
            return res.status(404).json({error: "No firm found"})
    
        }
    
    const restaurantName = firm.firmName;
    const products = await Product.find({firm: firmId})
    // const products = await Product.find({firm: firmId}).populate('firm');
    //res.status(200).json(products);
    res.status(200).json({ restaurantName, products})
    }
    catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error"})
    }
    
 }


 //Delete Product By Id
 const deleteProductById = async(req, res) => {
    try{
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);


        if(!deletedProduct){
            return res.status(404).json({error: "No product found"})
        }

        res.status.json("Product Deleted Successfully")
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"})
    }
 }

 
//Lets export these productController function to use , in other code files, and define the routing path to activate these function
module.exports = {addProduct: [upload.single('image'), addProduct], getProductsbyFirmId, getProductByFirm, deleteProductById};

