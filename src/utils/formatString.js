const _ = require('lodash')
exports.camelToSnake = (subject)=>{
    if(typeof subject === 'object'){
        const newSubject = {};
        for(let key in subject){
            if (subject.hasOwnProperty(key)){
                newSubject[_.snakeCase(key)] = subject[key];
            }
        }

        return newSubject
    }
    return _.snakeCase(subject)
}

exports.snakeTocamel = (subject)=>{
    if(typeof subject === 'object'){
        const newSubject = {};
        for(let key in subject){
            if (subject.hasOwnProperty(key)){
                newSubject[_.camelCase(key)] = subject[key];
            }
        }

        return newSubject
    }
    return _.snakeCase(subject)
}