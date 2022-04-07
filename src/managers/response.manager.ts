import { RequestResponseModel } from '../common/models/response.model';

export const requestResponse = (response: any): RequestResponseModel => {
    return {
        data: response
    };
}