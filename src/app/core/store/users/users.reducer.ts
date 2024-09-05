import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UsersStore } from './user.store';
import { deleteUser, editUser, registerNewUser, setSelectedUser } from './users.actions';
import { IUser } from '../../model/user.model';

export const initialState: Partial<UsersStore> = {
    users: [],
};

const reducer: ActionReducer<Partial<UsersStore>, Action> = createReducer(
    initialState,
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
      selectedUser: state.selectedUser ? state.selectedUser.id === action.user.id ? { ...action.user} : state.selectedUser : undefined
    })),
    on(deleteUser, (state, action) => ({
      ...state,
      users: state.users?.filter((user: IUser) => user.id !== action.id),
      selectedUser: state.selectedUser ? state.selectedUser.id === action.id ? undefined : state.selectedUser : undefined
    }))
);

export function usersReducer(
    state: Partial<UsersStore> = initialState,
    action: Action
): Partial<UsersStore>
{
    return reducer(state, action);
}
