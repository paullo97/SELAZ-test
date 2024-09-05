// Import necessary functions and variables from the ngrx store and other modules
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStore } from './task.store';
import { getUserSelected } from '../users/user.selectors';
import { getUsersState } from '../users/user.selectors';
import { EnumStatus } from '../../model/status.model';
import { ITask } from '../../model/task.model';

// Create a selector to get the task state from the store
const getTaskState = createFeatureSelector<TaskStore>('task');

// Create a selector to get the task list based on the filter and selected user
export const getTaskList = createSelector(
  getTaskState,
  getUserSelected, // Rescue info for user
  (store: TaskStore, selectedUser) => {
    // If the filter is 'all', return all tasks
    if(store.filter === 'all') {
      return store.tasks;
    }
    // If the filter is 'completed', return only completed tasks
    else if(store.filter === 'completed') {
      return store.tasks.filter((task) => task.status === EnumStatus.COMPLETED)
    }
    // If the filter is 'prepare', return only prepare tasks
    else if(store.filter === 'prepare') {
      return store.tasks.filter((task) => task.status === EnumStatus.PREPARE)
    }
    // If the filter is 'initiated', return only initiated tasks
    else if(store.filter === 'initiated') {
      return store.tasks.filter((task) => task.status === EnumStatus.INITIATED)
    }

    // Otherwise, return only tasks assigned to the selected user
    return store.tasks.filter((task) => task.user.id === selectedUser.id);
  }
);

// Create a selector to get the length of the task list
export const getTaskListLeght = createSelector(
  getTaskState,
  (store: TaskStore) => store.tasks.length
);

// Create a selector to get the resume of the task list
export const getInfoResume = createSelector(
  getTaskState,
  (store: TaskStore) => {

    // Return an object with the total number of tasks and the number of tasks in each status
    return {
      total: store.tasks.length, // Total number of tasks
      prepare: store.tasks.filter((task: ITask) => task.status === EnumStatus.PREPARE).length, // Number of tasks in prepare status
      initiated: store.tasks.filter((task: ITask) => task.status === EnumStatus.INITIATED).length, // Number of tasks in initiated status
      completed: store.tasks.filter((task: ITask) => task.status === EnumStatus.COMPLETED).length, // Number of tasks in completed status
    }
  }
);

// Create a selector to get the user with the most tasks
export const getUserWithMostTasks = createSelector(
  getTaskState,
  getUsersState,
  (taskStore: TaskStore, usersStore) => {
    // Create an object to store the number of tasks for each user
    const taskCountByUser = taskStore.tasks.reduce((acc, task) => {
      // Get the user id from the task
      const userId = task.user.id;
      // If the user id is not in the accumulator object, set it to 0
      if (!acc[userId]) {
        acc[userId] = 0;
      }
      // Increment the task count for the user
      acc[userId]++;
      // Return the accumulator object
      return acc;
    }, {} as Record<string, number>);

    // Initialize variables to store the user with the most tasks and the number of tasks
    let maxTasks = 0;
    let userWithMostTasks = null;

    // Iterate through the users and find the user with the most tasks
    usersStore.users.forEach(user => {
      // Get the task count for the user
      const taskCount = taskCountByUser[user.id] || 0;
      // If the task count is greater than the current max, update the max and the user
      if (taskCount > maxTasks) {
        maxTasks = taskCount;
        userWithMostTasks = user;
      }
    });

    // Return the user with the most tasks
    return userWithMostTasks;
  }
);
