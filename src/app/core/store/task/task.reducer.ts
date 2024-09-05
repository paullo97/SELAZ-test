import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { TaskStore } from './task.store';
import { editTask, nextStepTask, registerNewTask, removeTask } from './task.actions';

export const initialState: Partial<TaskStore> = {
    tasks: []
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
  }))
);

export function taskReducer(
  state: Partial<TaskStore> = initialState,
  action: Action
): Partial<TaskStore>
{
  return reducer(state, action);
}
