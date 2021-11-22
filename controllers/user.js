const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req,res)=>{
    
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    const existingUser = await User.findOne({email:email})

    if(existingUser) return res.json({error:"This email is already exist"})
    
    try {
        const hexPass = await bcrypt.hash(password,10)
        const newUser = new User({firstName:firstName,lastName:lastName,email:email,password:hexPass})

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
        if(user.isAdmin){
            res.json({user:{email:user.email ,isAdmin:user.isAdmin, token:token}})
        }else{
            res.json({user:{email:user.email, token:token}})
        }

    }else{
        res.json({error:"password incorrect"})
    }

}



module.exports = {signup,login}