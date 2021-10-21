const c = require('../constants/');

module.exports = (hostname)=>{
    
    switch (hostname) {
        case c.services.AUTH_SERVICE:
            return process.env.AUTH_SERVICE;
            break;
            
        case c.services.MAIL_SERVICE:
            return process.env.MAIL_SERVICE;
            break;

        case c.services.CORE_SERVICE:
            return process.env.CORE_SERVICE;
            break;

        case c.services.SEARCH_SERVICE:
            return process.env.SEARCH_SERVICE;
            break;
        case c.services.ORDER_SERVICE:
            return process.env.ORDER_SERVICE;
            break;

        default:
            return process.env.CORE_SERVICE;
            break;
    }
}