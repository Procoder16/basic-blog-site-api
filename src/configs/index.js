require('dotenv').config()

module.exports = { 
    MONGODB_URI:
        process.env.MONGODB_URI || 'mongodb://localhost:27017/blog',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
}