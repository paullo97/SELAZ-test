import { createAction, props } from '@ngrx/store';
import { storeTag } from './user.store';
import { IUser } from '../../model/user.model';

export const setSelectedUser = createAction(
  `${storeTag} Set Selected User`,
  props<{
    user: IUser;
}>()
);

export const registerNewUser = createAction(
  `${storeTag} Register New User`,
  props<{
    user: IUser;
  }>()
);

export const editUser = createAction(
  `${storeTag} Edit User`,
  props<{
    user: IUser;
  }>()
);

export const deleteUser = createAction(
  `${storeTag} Delete User`,
  props<{
    id: string;
  }>()
);
