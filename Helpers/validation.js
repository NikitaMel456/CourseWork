const Joi = require('joi');

const schemas = {
    'user': Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password:Joi.string(),
        phonenunber:Joi.string()
    }),
    'userUpd': Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password:Joi.string(),
        phonenunber:Joi.string()
    }),
    'post': Joi.object().keys({
        Title: Joi.string(),
        publishedOn: Joi.string(),
        authorId: Joi.string(),
        content: Joi.string(),
        City: Joi.string(),
        Contact:Joi.string(),
        Salary: Joi.number().integer().positive(),
        Author: Joi.string()

    }),
    'postUpd': Joi.object().keys({
        Title: Joi.string(),
        publishedOn: Joi.string(),
        authorId: Joi.string(),
        content: Joi.string(),
        City: Joi.string(),
        Contact:Joi.string(),
        Salary: Joi.string(),
        Author: Joi.string()
    }),
};

exports.check = function (schema, body) {
    if(!schemas[schema])
        return {};
    return Joi.validate(body, schemas[schema], {presence: 'required'});
}
