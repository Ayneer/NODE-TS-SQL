import errorList from '../common/errors.json';
import { ErrorModel } from '../common/models/error.model';

export const getErrorByKey = (errorKey: string): ErrorModel => {
    const { status, code, message } = errorList[errorKey] ?? errorList['UNKNOWN_ERROR'];
    return {
        error: {
            title: errorKey,
            code,
            status,
            message
        }
    };
}