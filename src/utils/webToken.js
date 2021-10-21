const jwt = require('jsonwebtoken');
// const C = require('../constants/');
const secret = process.env.JWT_SECRET;
exports.validate = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secret, (error, decoded)=>{
            if(error) {
                error.status = 401
                reject(error);
            } else {
                resolve(decoded);  
            }
        });
    })
}

exports.create = (value, expires = 60 * 60)=>{
    return jwt.sign(value, secret, {
        expiresIn: expires
    })
}