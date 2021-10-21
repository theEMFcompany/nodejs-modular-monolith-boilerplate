const request = require('superagent');

exports.post = (serviceName, endpoint, message )=>{
    return new Promise((resolve, reject)=>{
        request
        .post(serviceName + endpoint)
        .send(message)
        .end((error, response)=>{
            if(error){
                return reject(error)
            }
            return resolve(JSON.parse(response.text));
        })
    })
}

exports.put = (serviceName, endpoint, message )=>{
    return new Promise((resolve, reject)=>{
        request
        .put(serviceName + endpoint)
        .send(message)
        .end((error, response)=>{
            if(error){
                return reject(error)
            }
            return resolve(JSON.parse(response.text));
        })
    })
}

exports.get = (serviceName, endpoint, query )=>{
    return new Promise((resolve, reject)=>{
        request
        .get(serviceName + endpoint)
        .query(query)
        .end((error, response)=>{
            if(error){
                return reject(error)
            }
            return resolve(JSON.parse(response.text));
        })
    });
}