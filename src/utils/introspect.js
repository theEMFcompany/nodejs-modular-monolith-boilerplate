exports.response = responseObj => {
    if (responseObj.responseCode === 0) {
        throw responseObj.error || new Error(responseObj.text || 'Response Error')
    }
    return responseObj;
}