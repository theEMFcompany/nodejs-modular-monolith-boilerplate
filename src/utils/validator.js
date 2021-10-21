const joi = require('@hapi/joi');
exports.run = create => value => {
    const schema = create(joi);
    const result = schema.validate(value);
    if(result.error !== null) return result.error;
};