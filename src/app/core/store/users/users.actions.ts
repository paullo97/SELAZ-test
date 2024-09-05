// Importing the createAction and props functions from the @ngrx/store library
import { createAction, props } from '@ngrx/store';
// Importing the storeTag constant from the user.store file
import { storeTag } from './user.store';
// Importing the IUser interface from the user.model file
import { IUser } from '../../model/user.model';

// Creating an action to set the selected user
export const setSelectedUser = createAction(
  `${storeTag} Set Selected User`,
  props<{
    user: IUser;
}>()
);

// Creating an action to register a new user
export const registerNewUser = createAction(
  `${storeTag} Register New User`,
  props<{
    user: IUser;
  }>()
);

// Creating an action to edit a user
export const editUser = createAction(
  `${storeTag} Edit User`,
  props<{
    user: IUser;
  }>()
);

// Creating an action to delete a user
export const deleteUser = createAction(
  `${storeTag} Delete User`,
  props<{
    id: string;
  }>()
);
