const Size = require("../models/size");

const getSizes = async (req, res) => {
  const sizes = await Size.find();
  res.send(sizes);
};

// const createSize = async (req,res)=>{

//     try {
//         const newSize= new Size({
//             size:req.body.size,
//         })
//         await newSize.save()

//         res.json(newSize)
//     } catch (error) {
//         res.send(error.message)
//     }

// }

module.exports = { getSizes };
