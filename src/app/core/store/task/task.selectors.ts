import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStore } from './task.store';
import { getUserSelected } from '../users/user.selectors';

const getTaskState = createFeatureSelector<TaskStore>('task');

export const getTaskList = createSelector(
  getTaskState,
  getUserSelected,
  (store: TaskStore, selectedUser) => {
    if(store.filter === 'all') {
      return store.tasks;
    }
    else if(store.filter === 'completed') {
      return store.tasks.filter((task) => task.status === '2')
    }
    else if(store.filter === 'prepare') {
      return store.tasks.filter((task) => task.status === '0')
    }
    else if(store.filter === 'initiated') {
      return store.tasks.filter((task) => task.status === '1')
    }

    return store.tasks.filter((task) => task.user.id === selectedUser.id);
  }
);

export const getTaskListLeght = createSelector(
  getTaskState,
  (store: TaskStore) => store.tasks.length
);
