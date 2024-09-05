import { createAction, props } from '@ngrx/store';
import { storeTag } from './task.store';
import { ITask } from '../../model/task.model';

export const registerNewTask = createAction(
  `${storeTag} Register New Task`,
  props<{
    task: ITask;
  }>()
);

export const editTask = createAction(
  `${storeTag} Edit Task`,
  props<{
    task: ITask
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
