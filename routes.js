let express = require('express')

const controller = require('./controller')
const {addUserValidation} = require('./validation')

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello world")
})

router.post('/register', addUserValidation, controller.userRegister)


module.exports = router