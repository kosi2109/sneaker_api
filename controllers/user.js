const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req,res)=>{
    
    const fullName = req.body.fullName
    const phone = req.body.phone
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const existingUser = await User.findOne({email:email})

    if(existingUser) return res.json({error:"This email is already exist"})
    
    try {
        const hexPass = await bcrypt.hash(password,10)
        const data = {fullName:fullName,phone:phone,address:address,email:email,password:hexPass}

        const newUser = new User(data)

        await newUser.save()
        res.json({user:newUser})
    } catch (error) {
        res.json(error.message)
    }
}


const login = async (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({email:email})

    if (!user) res.json({error:"User Not exist"})

    const checkPas = await bcrypt.compare(password,user.password)
   
    if (checkPas){
        const token = jwt.sign({
            userId : user.id,
            isAdmin : user.isAdmin

        }, process.env.SECRET)
        res.json({result:{user_id:user._id, token:token}})

    }else{
        res.json({error:"password incorrect"})
    }

}

const getUser = async (req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error.message)
    }
}



module.exports = {signup,login,getUser}