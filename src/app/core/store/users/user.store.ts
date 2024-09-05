import { IUser } from "../../model/user.model";

// Define a constant for the store tag
export const storeTag: string = '[Users Store]';

// Define an interface for the UsersStore
export interface UsersStore
{
    users: Array<IUser>;
    selectedUser: IUser;
}
