import { createAction } from '@ngrx/store';
import { storeTag } from './user.store';

export const loadUsers = createAction(
    `${storeTag} Load Users`
);

export const loadUsersSuccess = createAction(
    `${storeTag} Load Users Success`
);
