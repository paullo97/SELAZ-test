import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStore } from './user.store';

export const getUsersState = createFeatureSelector<UsersStore>('users');

export const getUsersList = createSelector(
  getUsersState,
  (store: UsersStore) => store.users
);

export const getUsersListLength = createSelector(
  getUsersState,
  (store: UsersStore) => store.users.length
);

export const getUserSelected = createSelector(
  getUsersState,
  (store: UsersStore) => store.selectedUser
);
