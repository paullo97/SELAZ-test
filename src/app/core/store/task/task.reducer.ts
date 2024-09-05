// Import necessary modules and functions
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { TaskStore } from './task.store';
import { changeFilter, editTask, nextStepTask, registerNewTask, removeTask } from './task.actions';
import { EnumStatus } from '../../model/status.model';

// Define the initial state of the task store
export const initialState: Partial<TaskStore> = {
    tasks: [],
    filter: 'all'
};

// Create a reducer function to handle actions
const reducer: ActionReducer<Partial<TaskStore>, Action> = createReducer(
  initialState,
  // Handle the registerNewTask action
  on(registerNewTask, (state, action) => ({
      ...state,
      tasks: [...(state.tasks || []), {...action.task}]
  })),
  // Handle the editTask action
  // This function takes in a state and an action and returns a new state with the edited task
on(editTask, (state, action) => ({
    // Spread the current state
    ...state,
    // Map through the tasks array and return a new array with the edited task
    tasks: state.tasks?.map((task) => {
      // If the task id is not equal to the action task id, return the task as is
      if(task.id !== action.task.id) return task;
      // Otherwise, return the action task
      return {
        ...action.task
      }
    })
  })),

  // Handle the removeTask action
  on(removeTask, (state, action) => ({
    ...state,
    tasks: state.tasks?.filter((task) => task.id !== action.idTask)
  })),
  // Handle the nextStepTask action
  on(nextStepTask, (state, action) => ({
    ...state,
    tasks: state.tasks?.map((task) => {
      // Check if the task id matches the action idTask
      if (task.id !== action.idTask) return task;

      // Get an array of all possible statuses
      const statusArray = Object.values(EnumStatus);  // ['0', '1', '2']

      // Get the current index of the task's status in the status array
      const currentIndex = statusArray.indexOf(task.status);

      // Determine the next status based on the current index
      const nextStatus = action.complete
        ? EnumStatus.COMPLETED
        : statusArray[currentIndex + 1] || EnumStatus.COMPLETED;  // Move to the next or mark as completed

      // Return a new task object with the updated status
      return {
        ...task,
        status: nextStatus
      };
    })
  })),
  // Handle the changeFilter action
  on(changeFilter, (state, action) => ({
    ...state,
    filter: action.filter
  }))
);

// Export the task reducer function
export function taskReducer(
  state: Partial<TaskStore> = initialState,
  action: Action
): Partial<TaskStore>
{
  return reducer(state, action);
}
