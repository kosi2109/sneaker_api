const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{ 
    try {
        let decode;
        if (req.headers.authorization == undefined){
            next()
            return
        }

        const token = req.headers.authorization.split(" ")[1]
        decode = jwt.verify(token, process.env.SECRET)
        req.userId = decode?.userId
        req.isAdmin = decode?.isAdmin
        next()
    } catch (error) {
        console.log(error)
    }
} 


module.exports = {auth}