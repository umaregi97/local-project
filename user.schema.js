const {Joi} = require('express-validation')
const schema = {
    createUser: Joi.object( {
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20),
        userName: Joi.string().alphanum().min(2).max(20).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    })
}

module.exports = schema