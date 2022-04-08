import Joi from 'joi';
import { emailJoi, passwordJoi } from './user.schema';
import { getParamsErrorMessages } from '../utils.schema';

export const signInSchema = Joi.object({
    data: Joi.object({
        email: emailJoi,
        password: passwordJoi,
    })
        .required()
        .messages(getParamsErrorMessages('user_object'))
});