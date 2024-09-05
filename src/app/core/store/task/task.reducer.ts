import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { TaskStore } from './task.store';
import { changeFilter, editTask, nextStepTask, registerNewTask, removeTask } from './task.actions';
import { Statement } from '@angular/compiler';

export const initialState: Partial<TaskStore> = {
    tasks: [],
    filter: 'all'
};

const reducer: ActionReducer<Partial<TaskStore>, Action> = createReducer(
  initialState,
  on(registerNewTask, (state, action) => ({
      ...state,
      tasks: [...(state.tasks || []), {...action.task}]
  })),
  on(editTask, (state, action) => ({
    ...state,
    tasks: state.tasks?.map((task) => {
      if(task.id !== action.task.id) return task;

      console.log(action.task);
      return {
        ...action.task
      }
    })
  })),
  on(removeTask, (state, action) => ({
    ...state,
    tasks: state.tasks?.filter((task) => task.id !== action.idTask)
  })),
  on(nextStepTask, (state, action) => ({
    ...state,
    tasks: state.tasks?.map((task) => {
      if(task.id !== action.idTask) return task;

      return {
        ...task,
        status: action.complete ? '2' : (parseInt(task.status) + 1).toString()
      }
    })
  })),
  on(changeFilter, (state, action) => ({
    ...state,
    filter: action.filter
  }))
);

export function taskReducer(
  state: Partial<TaskStore> = initialState,
  action: Action
): Partial<TaskStore>
{
  return reducer(state, action);
}
