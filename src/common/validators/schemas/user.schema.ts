import Joi from 'joi';
import { getParamsErrorMessages, patternEmail } from '../utils.schema';

const emailJoi = Joi
    .string()
    .regex(patternEmail)
    .required()
    .messages(getParamsErrorMessages('user_email'));

export const createUserSchema = Joi.object({
    data: Joi.object({
        name: Joi
            .string()
            .required()
            .messages(getParamsErrorMessages('user_name')),
        email: emailJoi
    })
    .required()
    .messages(getParamsErrorMessages('user_object'))
});

export const getUserByEmailSchema = Joi.object({
    params: Joi.object({
        email: emailJoi
    })
});