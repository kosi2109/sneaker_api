const Brand = require("../models/brand");
const Product = require("../models/product");

const getProducts = async (req, res) => {
  const products = await Product.find() 
    .populate("brand")
    .populate("option.color")
    .populate("option.stock.size" , "size")
    
  res.json(products);
};

const getProductsByBrand = async (req,res) =>{
  const {brand} = req.params
  const getBrand = await Brand.findOne({brand:brand})
  const products = await Product.find({brand:getBrand.id}) 
    .populate("brand")
    .populate("option.color")
    .populate("option.stock.size" , "size")
    
  res.json(products);
}

const getFeatureProducts = async (req,res) =>{
  
  const products = await Product.find({isFeatured:true}).select("name description featureImage brand")
    .populate("brand")
    
    
  res.json(products);
}


const newProduct = async (req, res) => {
  const brand = await Brand.findById(req.body.brand);
  if (!brand) return res.status(400).send("Invalid Brand");

  try {
    const newProduct = new Product({
      brand: req.body.brand,
      name: req.body.name,
      isFeatured: req.body.isFeatured,
      description: req.body.description,
      richDescription: req.body.richDescription,
      releseDate: req.body.releseDate,
      option: req.body.option,
      featureImage: req.body.featureImage,
    });
    await newProduct.save();

    res.json(newProduct);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { getProducts, newProduct , getProductsByBrand ,getFeatureProducts };
