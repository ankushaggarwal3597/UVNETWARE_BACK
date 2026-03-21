const Joi = require("joi");

const eventSchema = Joi.object({
  eventName: Joi.string().required(),
  layoutId: Joi.number().required(),
  eventDate: Joi.date().iso().required(),
});

module.exports = eventSchema;
