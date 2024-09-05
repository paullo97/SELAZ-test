import { createAction, props } from '@ngrx/store';
import { storeTag } from './task.store';

export const registerNewTask = createAction(
  `${storeTag} Register New Task`,
  props<{
    task: any; // fix
  }>()
);

export const editTask = createAction(
  `${storeTag} Edit Task`,
  props<{
    task: any
  }>()
);

export const removeTask = createAction(
  `${storeTag} Remove Task`,
  props<{
    idTask: string;
  }>()
);

export const nextStepTask = createAction(
  `${storeTag} Next Step on Task`,
  props<{
    idTask: string;
    complete: boolean;
  }>()
);

export const changeFilter = createAction(
  `${storeTag} Change Filter`,
  props<{
    filter: string;
  }>()
);
