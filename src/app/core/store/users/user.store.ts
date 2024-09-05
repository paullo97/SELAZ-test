import { IUser } from "../../model/user.model";

export const storeTag: string = '[Users Store]';

export interface UsersStore
{
    users: Array<IUser>;
    selectedUser: IUser;
}
