import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolsHeaderListComponent } from '../tools-header-list/tools-header-list.component';
import { TaskStore } from '../../core/store/task/task.store';
import { Store } from '@ngrx/store';
import { getTaskList } from '../../core/store/task/task.selectors';
import { Observable } from 'rxjs';
import { UsersStore } from '../../core/store/users/user.store';
import { getUserSelected } from '../../core/store/users/user.selectors';
import { editTask, nextStepTask, registerNewTask, removeTask } from '../../core/store/task/task.actions';
import { CommonModule } from '@angular/common';
import { ModalCreateTaskComponent } from '../modals/modal-create-task/modal-create-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../../core/model/task.model';
import { IUser } from '../../core/model/user.model';
import { EnumStatus } from '../../core/model/status.model';

@Component({
  selector: 'app-list-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    ToolsHeaderListComponent,
    CommonModule
  ],
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent {
  // Observable to get the list of tasks from the store
  public listTask$: Observable<Array<ITask>> = this.taskStore.select(getTaskList);
  // Observable to get the selected user from the store
  public selectedUser$: Observable<IUser> = this.userStore.select(getUserSelected);

  constructor(
    // Injecting the task store and user store
    private readonly taskStore: Store<TaskStore>,
    private readonly userStore: Store<UsersStore>,
    public dialog: MatDialog
  ) { }

  // Method to handle the completion of a task
  public handleCompleteTask(idTask: string, complete: boolean): void {
    // Dispatching the nextStepTask action to the store
    this.taskStore.dispatch(nextStepTask({ idTask, complete }));
  }

  // Method to handle the editing of a task
  public handleEditTask(task: ITask): void {
    // Opening the modal to edit the task
    const dialogEdit = this.dialog.open(ModalCreateTaskComponent, {
      minHeight: '60vh',
      data: {
        task
      }
    });

    // Subscribing to the afterClosed event of the modal
    dialogEdit.afterClosed().subscribe((result) => {
      // If the result is not null, dispatching the editTask action to the store
      if(result) {
        this.taskStore.dispatch(editTask({ task: result }))
      }
    })
  }

  // Method to handle the deletion of a task
  public handleDeleteTask(idTask: string): void {
    // Dispatching the removeTask action to the store
    this.taskStore.dispatch(removeTask({ idTask }));
  }

  // Method to handle the registration of a new task
  public handleRegisterTask(newTasks: ITask) {
    // Dispatching the registerNewTask action to the store
    this.taskStore.dispatch(registerNewTask({ task: newTasks }));
  }

  // Method to identify the status of a task
  public identifyStatus(status: EnumStatus) {
    return {
      [EnumStatus.COMPLETED]: 'Completed',
      [EnumStatus.INITIATED]: 'Initiated',
      [EnumStatus.PREPARE]: 'Prepare',
    }[status] || '';
  }
}
