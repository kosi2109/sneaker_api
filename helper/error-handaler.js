function errorHandaler (err,req,res,next){
    if (err === "UnauthorizedError"){
        return res.status(401).json({message: "The user is not Authenticate"})
    }

    if (err === "UnauthorizedError"){
        return res.status(401).json({message: err})
    }

    return res.status(401).json(err)
}

module.exports = errorHandaler