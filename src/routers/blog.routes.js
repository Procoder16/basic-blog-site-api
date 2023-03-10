const { Router } = require('express')
const { Create, Delete, ListAll, ListOne, Draft, Publish, Update, ListMine, } = require('../controllers/blog.controller')
const { verifyUser, verifyAdmin } = require('../middlewares/auth.middleware')

const route = new Router()

route.post('/create', verifyUser, Create)

route.patch('/publish/:id', verifyUser, Publish)

route.patch('/draft/:id', verifyUser, Draft)

route.delete('/:id', verifyUser, Delete)

route.get("/", ListAll)

route.get('/me', verifyUser, ListMine)

route.get("/:id", ListOne)

route.patch("/:id", verifyUser, Update)

module.exports = route