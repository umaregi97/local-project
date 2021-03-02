const { createUser } = require('./user.schema')

module.exports = {
    addUserValidation: async (req, res, next) => {
        const value = await createUser.validate(req.body)
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}