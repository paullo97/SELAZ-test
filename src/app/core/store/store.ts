import { Action, ActionReducerMap } from '@ngrx/store';
import { UsersStore } from './users/user.store';
import { usersReducer } from './users/users.reducer';
import { TaskStore } from './task/task.store';
import { taskReducer } from './task/task.reducer';

export interface AppState
{
    users: UsersStore,
    task: TaskStore
}

/**
 * App root store containing all reducers.
 */
export const reducers: ActionReducerMap<object, Action> = {
    users: usersReducer,
    task: taskReducer
};
