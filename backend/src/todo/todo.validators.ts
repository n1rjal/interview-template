import Joi from "@hapi/joi";

export const todoSchema = Joi.object({
  title: Joi.string().required().max(100).min(1),
  description: Joi.string().required().max(10000).min(1),
  attend_at: Joi.date().required(),
  is_completed: Joi.boolean().required(),
});
