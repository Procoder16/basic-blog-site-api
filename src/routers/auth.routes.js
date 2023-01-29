const { Router } = require('express')
const { CreateUser, loginUser } = require('../controllers/auth.controller')

const route = new Router()

route.post('/register', CreateUser)

route.post('/login', loginUser)

module.exports = route