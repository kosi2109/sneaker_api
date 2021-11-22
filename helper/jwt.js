const expressJwt = require("express-jwt")

const jwtAuth = ()=>{
    const secret =  process.env.SECRET
    return expressJwt({
        secret,
        algorithms : ["HS256"],
        isRevoked : isRevoked
    }).unless({
        path: [
            {url : /\/api\/v1\/products(.*)/,method:['GET','OPTION']},
            {url : /\/api\/v1\/brands(.*)/,method:['GET','OPTION']},
            {url : /\/api\/v1\/colors(.*)/,method:['GET','OPTION']},
            {url : /\/api\/v1\/sizes(.*)/,method:['GET','OPTION']},
            {url : /\/api\/v1\/orders(.*)/,method:['POST','OPTION']},
            '/api/v1/users/login',
            '/api/v1/users/signup',
            
        ]
    })
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        return done(null,true)
    }

    return done()
}

module.exports = jwtAuth