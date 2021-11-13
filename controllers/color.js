const Color = require("../models/color")


const getColor = async (req,res)=>{
    const colors = await Color.find()
    res.send(colors)
}


const createColor = async (req,res)=>{

    try {
        const newColor= new Color({
            color: req.body.color,
            hex: req.body.hex,
        })
        await newColor.save()

        res.json(newColor)
    } catch (error) {
        res.send(error.message)
    }
    
}

module.exports = {getColor,createColor}