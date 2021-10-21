const jsSHA = require('jssha');
var md5 = require('md5');

const hasher = {}
    // const shaObj = new jsSHA('SHA-1', 'TEXT')

hasher.create = function(text) {
    const shaObj = new jsSHA('SHA-1', 'TEXT')
    shaObj.update(process.env.HASH_SALT);
    shaObj.update(text);
    return shaObj.getHash('HEX')
};

hasher.verifyHash = function(text, hash) {
    const test = hasher.create(text)
    if(test === hash) return true
    return false;
};

hasher.createMd5 = function(text) {
    return md5(text);
};

module.exports = hasher;