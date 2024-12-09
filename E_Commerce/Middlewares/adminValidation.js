const Joi = require('joi')
const validateAdmin = (request,response,next)=>{

    const schema = Joi.object({
        email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .required(),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{8,30}$/).required(),
        name: Joi.string().min(3).max(20).required(),
        address:Joi.string().min(3).max(10).required(),
        path:Joi.string()

    })
    const result=schema.validate(request.body)
    if(result.error)
    {
        console.log('111111111111111111111111')
        console.log(result.error)
        return response.json(401,{
            code:401,
            message:'Invalid '+result.error.details[0].context.label
        })
    }
    next()
}
module.exports = {validateAdmin}