const jwt = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
module.exports = {
    signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecretKey, {
            }, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecretKey, (err, payload) => {
                if (err) {
                    const message = err.name = 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }
                console.log("verifyAccessToken:",payload)
                resolve(payload)
            }) 
        })
    }
}