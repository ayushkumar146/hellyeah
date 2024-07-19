const {
    createProduct,
    getProduct,
    updateProduct,
    getsingleProduct,
    getallProduct,
}=require("../controllers/productController");

const router = require("express").Router();

router.post("/createproduct",createProduct);
router.get("/getproduct",getProduct);
router.put("/updateproduct/:id",updateProduct);
router.get("/getsingleproduct/:id",getsingleProduct);
router.get("/getallproduct/",getallProduct);
module.exports = router;