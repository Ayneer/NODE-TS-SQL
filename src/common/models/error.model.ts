import { HttpCodeEnum } from '../constants';

export interface ErrorModel {
    error: {
        code: string;
        status: HttpCodeEnum;
        message: string;
        title: string;
    }
}