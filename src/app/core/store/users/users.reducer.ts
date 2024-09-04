import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UsersStore } from './user.store';
import { deleteUser, editUser, loadUsers, loadUsersSuccess, registerNewUser, setSelectedUser } from './users.actions';

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
    })),
    on(setSelectedUser, (state, action) => ({
      ...state,
      selectedUser: action.user
    })),
    on(registerNewUser, (state, action) => ({
      ...state,
      users: [...(state.users || []), {...action.user}]
    })),
    on(editUser, (state, action) => ({
      ...state,
      users: state.users?.map((user) => {
        if(user.id !== action.user.id) return user;

        return {
          ...user,
          name: action.user.name,
          role: action.user.role
        }
      }),
      selectedUser: state.selectedUser.id === action.user.id ? { ...action.user} : state.selectedUser
    })),
    on(deleteUser, (state, action) => ({
      ...state,
      users: state.users?.filter((user: any) => user.id !== action.id),
      selectedUser: state.selectedUser.id === action.id ? null : state.selectedUser
    }))
);

export function usersReducer(
    state: Partial<UsersStore> = initialState,
    action: Action
): Partial<UsersStore>
{
    return reducer(state, action);
}
