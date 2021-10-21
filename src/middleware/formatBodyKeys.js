const utils = require('../utils/')
module.exports = (bodyKey)=>(req, res, next)=> {
    if(Array.isArray(bodyKey)) {
        bodyKey.forEach(k=>{
            if(req.body[k]) {
                req.body[k] = utils.formatString.camelToSnake(req.body[k]);
            }
        })
        return next()
    }
    if(bodyKey && req.body[bodyKey]) {
        const formatedBodyKey = utils.formatString.camelToSnake(req.body[bodyKey]);
        req.body[bodyKey] = formatedBodyKey;
        
        return next()
    }
    const formatedBody = utils.formatString.camelToSnake(req.body);
    req.body = formatedBody;
    next()
}