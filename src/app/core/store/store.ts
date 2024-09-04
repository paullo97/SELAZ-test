import { Action, ActionReducerMap } from '@ngrx/store';
import { UsersStore } from './users/user.store';
import { usersReducer } from './users/users.reducer';

export interface AppState
{
    users: UsersStore
}

/**
 * App root store containing all reducers.
 */
export const reducers: ActionReducerMap<object, Action> = {
    users: usersReducer
};
