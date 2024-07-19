const Product=require("../models/productModel");


module.exports.createProduct=async(req,res,next)=>{

    try{
        const {name,quantity,price}=req.body;
        const nc=await Product.findOne({name});
        if(nc){
            return res.json({ msg: "product already there", status: false });
        }
        if(!name || !quantity || !price){
            return res.json({msg:"fill every field",status:false});
        }
        const prod=await Product.create({
name,
quantity,
price,
        });
        return res.json({ status: true, prod});

    }
    catch (error){
 res.send(error);
    }
 
}

module.exports.getProduct = async (req, res, next) => {
    try {
        // console.log(req.query.mango);.
        // const val = await Product.findOne({ [req.query.key]: req.query.value });
        // console.log(req.query[key]);
        console.log(Object.entries(req.query)[0][0]);
        const  productName=Object.entries(req.query)[0][0]; 

        // if(req.query.mango){
        // productName=req.query.mango;
        // } 
        //     else if(req.query.apple){
        //         productName=req.query.grape;
        //         }
        //        else if(req.query.orange){
        //             productName=req.query.orange;
        //             }
        //             else if(req.query.banana){
        //                 productName=req.query.banana;
        //                 }

      console.log(productName);
      if (!productName) {
        return res.status(400).json({ error: 'Product name is required' });
      }
  
      // Use regex to perform exact, case-insensitive search based on productName
      const products = await Product.find({
        name: { $regex: new RegExp(`^${productName}$`, 'i') } // Exact, case-insensitive match
      });
  if(products){
    return res.json({ status: true, products});

} // Respond with the matching products
   else{
    res.status(500).json({ error: 'Product not found' });
   }
    } catch (error) {
      console.error('Error occurred while searching for products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
 

  module.exports.updateProduct=async(req,res,next)=>{
    const { id } = req.params; // Extract product ID from request parameters
  const { name, quantity, price } = req.body; // Extract updated data from request body

  try {
    // Find the product by ID and update its properties
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct); // Respond with the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  }
  module.exports.getsingleProduct = async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    try {
      // Find product by ID using findById

      const product = await Product.findById(id);
            // console.log(product);
      if (!product) {
        // If product is not found, return 404 Not Found
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // If product is found, return the product data
      res.json(product);
    } catch (error) {
      console.error('Error finding product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

   module.exports.getallProduct=async(req,res,next)=>{
    try {
      // Fetch all products from the database
      const products = await Product.find();

      // Respond with the array of products
      if(products){
      res.json(products);
      }
      else{
        return res.status(404).json({ error: 'Products not found' });

      }
  } catch (error) {
      // Handle errors
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }  

   }