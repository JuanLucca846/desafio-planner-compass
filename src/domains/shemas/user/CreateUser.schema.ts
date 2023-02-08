import * as Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.date().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().equal(Joi.ref("password")),
});