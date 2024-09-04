import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UsersStore } from './user.store';
import { loadUsers, loadUsersSuccess } from './users.actions';

export const initialState: Partial<UsersStore> = {
    users: [],
    loading: true
};

const reducer: ActionReducer<Partial<UsersStore>, Action> = createReducer(
    initialState,
    on(loadUsers, (state) => ({
        ...state,
        loading: true
    })),
    on(loadUsersSuccess, (state) => ({
        ...state,
        loading: false
    }))
);

export function usersReducer(
    state: Partial<UsersStore> = initialState,
    action: Action
): Partial<UsersStore>
{
    return reducer(state, action);
}
