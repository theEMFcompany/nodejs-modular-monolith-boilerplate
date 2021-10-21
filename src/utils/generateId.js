const uuidV4 = require('uuid/v4');

module.exports = (nameSpace) =>{
    const id = nameSpace 
                ? nameSpace + '-' + uuidV4().split('-').join('') 
                : uuidV4().split('-').join('');
    return id;
}