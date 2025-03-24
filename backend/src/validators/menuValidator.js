const Joi = require('joi');

const menuItemSchema = Joi.object({
    nom: Joi.string().min(3).max(30).required(),
    prix: Joi.number().min(0).required()
});

const menuSchema = Joi.object({
    nom: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(500).optional(),
    prix: Joi.number().min(0).required(),
    disponible: Joi.boolean().required(),
    items: Joi.array().items(menuItemSchema).optional(),
    cafeteria: Joi.string().required()
});

module.exports = { menuSchema };