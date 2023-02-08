import * as Joi from "joi";

export const createEventSchema = Joi.object({
  description: Joi.string().required(),
  userId: Joi.string().required(),
});