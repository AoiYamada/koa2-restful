const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().alphanum.min(3).required(0)
}).with('name');

function validator(ctx, next) {
    console.log(123);
    const result = Joi.validate(ctx.query, schema)
    if(result === null)  await next();
    else ctx.throw(500, 'Validation falied ');
}

exports.validator = validator;