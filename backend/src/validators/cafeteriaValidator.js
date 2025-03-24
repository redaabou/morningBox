const Joi = require('joi');

const cafeteriaSchema = Joi.object({
    nom: Joi.string().min(3).max(30).required(),
    adresse: Joi.string().min(5).max(100).required(),
    telephone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    description: Joi.string().max(500).optional()
});

module.exports = { cafeteriaSchema };