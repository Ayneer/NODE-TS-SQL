import { Users } from '../dataBase/models/user.model';

export interface SignInModel {
    user: Partial<Users>;
    token: string;
}