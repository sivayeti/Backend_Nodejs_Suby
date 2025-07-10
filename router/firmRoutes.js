

//Here we are adding the firm details to firm, i.e insertion operation so we have to use the router.post() method to define the routing path to activate the addFirm function

const express = require("express")

const router = express.Router()

const firmController = require("../controller/firmController")

const verifyToken = require("../middlewares/verifyToken")

router.post('/addfirm', verifyToken, firmController.addFirm);


//Dynamic routing for images
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName ))
})


router.delete('/:firmId', firmController.deleteFirmById)
//export these router
module.exports = router


