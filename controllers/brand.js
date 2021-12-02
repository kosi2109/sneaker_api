const Brand = require("../models/brand")


const getBrands = async (req,res)=>{
    const brands = await Brand.find()
    res.send(brands)
}



// const createBrand = async (req,res)=>{

//     try {
//         const newBrand = new Brand({
//             brand:req.body.brand,
//             icon: req.body.icon,
//         })
//         await newBrand.save()

//         res.json(newBrand)
//     } catch (error) {
//         res.send(error.message)
//     }
    
// }






module.exports = {getBrands}