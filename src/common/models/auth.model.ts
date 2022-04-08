import { Users } from '../dataBase/models/user.model';

export interface SignInModel {
    user: Partial<Users>;
    tocken: string;
}