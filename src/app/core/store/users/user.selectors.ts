// Import the createFeatureSelector and createSelector functions from the @ngrx/store module
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Import the UsersStore from the user.store module
import { UsersStore } from './user.store';

// Create a selector to get the state of the users feature
export const getUsersState = createFeatureSelector<UsersStore>('users');

// Create a selector to get the list of users from the state
export const getUsersList = createSelector(
  getUsersState,
  (store: UsersStore) => store.users
);

// Create a selector to get the length of the list of users from the state
export const getUsersListLength = createSelector(
  getUsersState,
  (store: UsersStore) => store.users.length
);

// Create a selector to get the selected user from the state
export const getUserSelected = createSelector(
  getUsersState,
  (store: UsersStore) => store.selectedUser
);
