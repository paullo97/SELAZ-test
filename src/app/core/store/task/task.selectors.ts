import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStore } from './task.store';

const getTaskState = createFeatureSelector<TaskStore>('task');

export const getTaskList = createSelector(
  getTaskState,
  (store: TaskStore) => store.tasks
);

export const getTaskListLeght = createSelector(
  getTaskState,
  (store: TaskStore) => store.tasks.length
);
