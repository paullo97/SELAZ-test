import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { TaskStore } from './task.store';
import { changeFilter, editTask, nextStepTask, registerNewTask, removeTask } from './task.actions';
import { Statement } from '@angular/compiler';
import { EnumStatus } from '../../model/status.model';

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
      if (task.id !== action.idTask) return task;

      const statusArray = Object.values(EnumStatus);  // ['0', '1', '2']
      const currentIndex = statusArray.indexOf(task.status);

      // Determinar o próximo status com base no índice atual
      const nextStatus = action.complete
        ? EnumStatus.COMPLETED
        : statusArray[currentIndex + 1] || EnumStatus.COMPLETED;  // Avançar para o próximo ou marcar como completo

      return {
        ...task,
        status: nextStatus
      };
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
