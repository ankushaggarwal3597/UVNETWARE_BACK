const Joi = require("joi");

const layoutSchema = Joi.object({
  layoutName: Joi.string().required(),
  layoutType: Joi.string().required(),
  layoutData: Joi.object().required(),
});

module.exports = layoutSchema;