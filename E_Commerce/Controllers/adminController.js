const adminModel=require('../Models/adminModel')
const jwt = require('jsonwebtoken');
const tokenPrivateKey="123@123#"
const bcrypt = require('bcrypt');


const loginAdmin=async(request,response)=>{
    const result=await adminModel.loginAdmin(request.body)
    if(!result){
        return response.json(404,{
            code:404,
            message:"Invalid email account"
        })
    }
    if(!bcrypt.compareSync( request.body.password, result.password))
    {
        return response.json(401,{
            code:401,
            message:"Invalid username or password"
        })
    }
    const token = jwt.sign({ email: result.email }, tokenPrivateKey);
    return response.json(200,{
        code:200,
        message:"login successfully",
        token:token
    })

}
const addAdmin=async(request,response)=>{
    try{
    const checkResult=await adminModel.selectOneAdmin(request.body)
    console.log(checkResult)
    if(checkResult)
    {
        return response.json(409,{
                code:409,
                message:"Email acount already existed"
            })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);
    request.body.password=hash
    const result=await adminModel.addAdmin(request.body)
    console.log(result)
    return response.json(201,{
        code:201,
        message:"created successfully"
    })
    }
    catch(error)
    {
        return response.json(500,{
            code:500,
            message:"Internal Server Error"
        })
    }
}
const updateAdmin=async(request,response)=>{
    
    try{
        const record=request.body
        const token= request.headers.authorization.split(' ')[1];
        const email=jwt.verify(token, tokenPrivateKey).email
        record.email=email
        const updateResult=await adminModel.updateAdmin(record)
        if(updateResult.modifiedCount){
            return response.json(200,{
                code:200,
                message:"updated successfully"
            })
        }
        else if(updateResult.matchedCount)
        {
            return response.json(304,{
                code:304,
                message:"Not modified"
            })
        }
        else{
            return response.json(404,{
                code:404,
                message:"account not existed"
            })
        }
    }
    catch(error)
    {
        return response.json(500,{
            code:500,
            message:error.message
        })
    }
   

}
const deleteAdmin = async (request,response)=>{
    try{
        const record=request.body
        const token= request.headers.authorization.split(' ')[1];
        const email=jwt.verify(token, tokenPrivateKey).email
        record.email=email
        const updateResult=await adminModel.deleteAdmin(record)
        console.log(updateResult)
        if(updateResult.deletedCount){
            return response.json(200,{
                code:200,
                message:"deleted successfully"
            })
        }
        else{
            return response.json(404,{
                code:404,
                message:"account not existed"
            })
        }
    }
    catch(error)
    {
        return response.json(500,{
            code:500,
            message:error.message
        })
    }
}
const getAll = async (request,response)=>{
    try{
        const findResult=await adminModel.getAll(request.body)
        console.log(findResult)
        findResult.forEach(x=>{
            delete x.password
            delete x._id
        })
        if(findResult){
            return response.json(200,findResult)
        }
        else{
            return response.json(404,{
                code:404,
                message:"account not existed"
            })
        }
    }
    catch(error)
    {
        return response.json(500,{
            code:500,
            message:error.message
        })
    }
}
// const restoreAdmin=(request,response)=>{
//     response.send('Restore Admin')
// }
module.exports={
    getAll,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    // restoreAdmin,
    loginAdmin
}