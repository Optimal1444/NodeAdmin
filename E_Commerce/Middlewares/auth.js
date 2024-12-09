const jwt = require('jsonwebtoken');
const tokenPrivateKey="123@123#"
const checkToken = (request,response,next)=>{
    try{
        console.log(request.headers)
        const token= request.headers.authorization.split(' ')[1];
        

        if(jwt.verify(token, tokenPrivateKey).email)
            next()
    }catch(error){
        return response.json(401,{
            code:401,
            message:'Invalid token'
        })
    }
}
module.exports = {checkToken}