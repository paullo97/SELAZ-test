import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UsersStore } from './user.store';
import { deleteUser, editUser, registerNewUser, setSelectedUser } from './users.actions';
import { IUser } from '../../model/user.model';

export const initialState: Partial<UsersStore> = {
    users: [],
};

// Create a reducer function that takes in a partial UsersStore and an Action as parameters
const reducer: ActionReducer<Partial<UsersStore>, Action> = createReducer(
    // Set the initial state to the initialState
    initialState,
    // On the setSelectedUser action, update the selectedUser in the state
    on(setSelectedUser, (state, action) => ({
      ...state,
      selectedUser: action.user
    })),
    // On the registerNewUser action, add the new user to the users array in the state
    on(registerNewUser, (state, action) => ({
      ...state,
      users: [...(state.users || []), {...action.user}]
    })),
    // On the editUser action, update the user in the users array in the state
    on(editUser, (state, action) => ({
      ...state,
      users: state.users?.map((user) => {
        // If the user id does not match the action user id, return the user as is
        if(user.id !== action.user.id) return user;

        // Otherwise, return a new user object with the updated name and role
        return {
          ...user,
          name: action.user.name,
          role: action.user.role
        }
      }),
      // Update the selectedUser if it matches the edited user
      selectedUser: state.selectedUser ? state.selectedUser.id === action.user.id ? { ...action.user} : state.selectedUser : undefined
    })),
    // On the deleteUser action, remove the user from the users array in the state
    on(deleteUser, (state, action) => ({
      ...state,
      users: state.users?.filter((user: IUser) => user.id !== action.id),
      // Update the selectedUser if it matches the deleted user
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
