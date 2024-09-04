export const storeTag: string = '[Users Store]';

export interface UsersStore
{
    users: Array<any>;
    selectedUser: any;
    loading: boolean;
}
