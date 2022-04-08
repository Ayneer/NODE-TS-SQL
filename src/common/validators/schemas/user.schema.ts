import Joi from 'joi';
import { getParamsErrorMessages, patternEmail } from '../utils.schema';

export const emailJoi = Joi
    .string()
    .regex(patternEmail)
    .required()
    .messages(getParamsErrorMessages('user_email'));

export const passwordJoi = Joi
    .string()
    .required()
    .messages(getParamsErrorMessages('user_password'));

export const createUserSchema = Joi.object({
    data: Joi.object({
        name: Joi
            .string()
            .required()
            .messages(getParamsErrorMessages('user_name')),
        email: emailJoi,
        password: passwordJoi,
    })
        .required()
        .messages(getParamsErrorMessages('user_object'))
});