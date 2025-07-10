
const express = require("express")

const router = express.Router();

const productController = require("../controller/productController")
router.post('/addproduct/:firmId', productController.addProduct)

router.get('/get-products/:firmId', productController.getProductsbyFirmId) //retrieves the firm and populates the products under that firm, the firm id, which we sent in request

router.get('/:firmId/products', productController.getProductByFirm) //retrieves the products which are under the requested firmId


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName ))
})


//Lets develeop the routing path to activate the deleteProductById function
router.delete('/:productId', productController.deleteProductById)
module.exports = router;

