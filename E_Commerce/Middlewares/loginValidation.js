const Joi = require('joi')
const validateLogin = (request,response,next)=>{
    console.log('ssss')
    const schema = Joi.object({
        email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .required(),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{8,30}$/).required()
    })
    const result=schema.validate(request.body)
    if(result.error)
    {
        return response.json(401,{
            code:401,
            message:'Invalid '+result.error.details[0].context.label
        })
    }
    next()
}
module.exports = {validateLogin}