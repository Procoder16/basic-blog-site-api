const User = require('../models/user.model')
const { generateJWT } = require('../lib/auth.adapter')
const { validateUser } = require('../validators/user.validation')

const CreateUser = async (req, res, next) => {
    try {
        const userRegData = await validateUser(req.body)
        const { username, password, email, name } = userRegData
        const user = new User({
            username,
            email,
            name,
            attributes: {
                role: 'user',
                isDisabled: false,
            }
        })

        await user.setPassword(String(password))
        await user.save()

        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            error: null,
            data: {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.attributes.role,
            }
        })
    }
    catch(err){
        next(err)
    }
}

async function loginUser(req, res, next) {
    try {
        const { login_user, password } = req.body
        const user = await User.findOne({ $or: [{ username: login_user }, { email: login_user }] })
        if(!user){
            throw new Error('User not found')
        }
        if(!user.validatePassword(password)){
            throw new Error('Invalid password')
        }
        const token = await generateJWT(user)
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            error: null,
            data: {
                access_token: token,
            }
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    loginUser,
    CreateUser,
}