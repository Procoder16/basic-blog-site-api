const { Router } =require('express')

const authRouter =require('./auth.routes')
const userRouter =require('./user.routes')
const blogRouter =require('./blog.routes')

const router = Router()

router.get('/auth', authRouter)
router.get('/user', userRouter)
router.get('/blog', blogRouter)

module.exports = router