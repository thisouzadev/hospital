import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000).required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP_H: Joi.string().default('3600s'),
  JWT_EXP_D: Joi.string().default('1d'),
});
