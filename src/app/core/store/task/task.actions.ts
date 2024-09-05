// Importing necessary modules
import { createAction, props } from '@ngrx/store';
import { storeTag } from './task.store';
import { ITask } from '../../model/task.model';

// Creating an action to register a new task
export const registerNewTask = createAction(
  `${storeTag} Register New Task`, // Action type
  props<{
    task: ITask; // Task to be registered
  }>() // Props
);

// Creating an action to edit a task
export const editTask = createAction(
  `${storeTag} Edit Task`, // Action type
  props<{
    task: ITask; // Task to be edited
  }>() // Props
);

// Creating an action to remove a task
export const removeTask = createAction(
  `${storeTag} Remove Task`, // Action type
  props<{
    idTask: string; // ID of the task to be removed
  }>() // Props
);

// Creating an action to move a task to the next step
export const nextStepTask = createAction(
  `${storeTag} Next Step on Task`, // Action type
  props<{
    idTask: string; // ID of the task to be moved
    complete: boolean; // Whether the task is complete or not
  }>() // Props
);

// Creating an action to change the filter
export const changeFilter = createAction(
  `${storeTag} Change Filter`, // Action type
  props<{
    filter: string; // Filter to be changed
  }>() // Props
);
