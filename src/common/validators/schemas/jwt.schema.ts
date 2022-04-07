import Joi from 'joi';
import { getParamsErrorMessages } from '../utils.schema';

export const jwtSchema = Joi.object({
    token: Joi
        .string()
        .required()
        .messages(getParamsErrorMessages('token'))
}).unknown(true);