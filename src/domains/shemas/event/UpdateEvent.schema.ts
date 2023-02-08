import * as Joi from "joi";

export const updateEventSchema = Joi.object({
  description: Joi.string().required(),
});