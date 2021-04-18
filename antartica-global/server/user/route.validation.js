const Joi = require('joi');

// const { Joi } = require('express-validation');

module.exports = {
    user: {
        registerUser: {
            body: {
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                organization_name: Joi.string().required(),
            }
        },
        login: {
            body: {
                email: Joi.string().required(),
                password: Joi.string().required(),
            }
        }
    }
}