import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStore } from './task.store';
import { getUserSelected } from '../users/user.selectors';
import { getUsersState } from '../users/user.selectors';
import { EnumStatus } from '../../model/status.model';
import { ITask } from '../../model/task.model';

const getTaskState = createFeatureSelector<TaskStore>('task');

export const getTaskList = createSelector(
  getTaskState,
  getUserSelected,
  (store: TaskStore, selectedUser) => {
    if(store.filter === 'all') {
      return store.tasks;
    }
    else if(store.filter === 'completed') {
      return store.tasks.filter((task) => task.status === EnumStatus.COMPLETED)
    }
    else if(store.filter === 'prepare') {
      return store.tasks.filter((task) => task.status === EnumStatus.PREPARE)
    }
    else if(store.filter === 'initiated') {
      return store.tasks.filter((task) => task.status === EnumStatus.INITIATED)
    }

    return store.tasks.filter((task) => task.user.id === selectedUser.id);
  }
);

export const getTaskListLeght = createSelector(
  getTaskState,
  (store: TaskStore) => store.tasks.length
);

export const getInfoResume = createSelector(
  getTaskState,
  (store: TaskStore) => {

    return {
      total: store.tasks.length,
      prepare: store.tasks.filter((task: ITask) => task.status === EnumStatus.PREPARE).length,
      initiated: store.tasks.filter((task: ITask) => task.status === EnumStatus.INITIATED).length,
      completed: store.tasks.filter((task: ITask) => task.status === EnumStatus.COMPLETED).length,
    }
  }
);

export const getUserWithMostTasks = createSelector(
  getTaskState,
  getUsersState,  // Obtenha o estado dos usuários
  (taskStore: TaskStore, usersStore) => {
    const taskCountByUser = taskStore.tasks.reduce((acc, task) => {
      const userId = task.user.id;
      if (!acc[userId]) {
        acc[userId] = 0;
      }
      acc[userId]++;
      return acc;
    }, {} as Record<string, number>);

    let maxTasks = 0;
    let userWithMostTasks = null;

    // Iterar sobre os usuários para encontrar quem tem mais tarefas
    usersStore.users.forEach(user => {
      const taskCount = taskCountByUser[user.id] || 0;
      if (taskCount > maxTasks) {
        maxTasks = taskCount;
        userWithMostTasks = user;
      }
    });

    return userWithMostTasks;
  }
);
