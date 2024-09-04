import { createAction, props } from '@ngrx/store';
import { storeTag } from './user.store';

export const loadUsers = createAction(
    `${storeTag} Load Users`
);

export const loadUsersSuccess = createAction(
    `${storeTag} Load Users Success`
);

export const setSelectedUser = createAction(
  `${storeTag} Set Selected User`,
  props<{
    user: any // FIX
}>()
);

export const registerNewUser = createAction(
  `${storeTag} Register New User`,
  props<{
    user: any; // fix
  }>()
);

export const editUser = createAction(
  `${storeTag} Edit User`,
  props<{
    user: any; //fix
  }>()
);

export const deleteUser = createAction(
  `${storeTag} Delete User`,
  props<{
    id: string;
  }>()
);
