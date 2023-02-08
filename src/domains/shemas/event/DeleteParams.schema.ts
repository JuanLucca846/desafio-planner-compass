import * as Joi from "joi";

export const deleteParamsSchema = Joi.object({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("Invalid id!"),
});
