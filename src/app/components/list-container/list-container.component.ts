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
  public listTask$: Observable<Array<ITask>> = this.taskStore.select(getTaskList);
  public selectedUser$: Observable<IUser> = this.userStore.select(getUserSelected);

  constructor(
    private readonly taskStore: Store<TaskStore>,
    private readonly userStore: Store<UsersStore>,
    public dialog: MatDialog
  ) { }

  public handleCompleteTask(idTask: string, complete: boolean): void {
    this.taskStore.dispatch(nextStepTask({ idTask, complete }));
  }

  public handleEditTask(task: ITask): void {
    const dialogEdit = this.dialog.open(ModalCreateTaskComponent, {
      minHeight: '60vh',
      data: {
        task
      }
    });

    dialogEdit.afterClosed().subscribe((result) => {
      if(result) {
        this.taskStore.dispatch(editTask({ task: result }))
      }
    })
  }

  public handleDeleteTask(idTask: string): void {
    this.taskStore.dispatch(removeTask({ idTask }));
  }

  public handleRegisterTask(newTasks: ITask) {
    this.taskStore.dispatch(registerNewTask({ task: newTasks }));
  }

  public identifyStatus(status: EnumStatus) {
    return {
      [EnumStatus.COMPLETED]: 'Completed',
      [EnumStatus.INITIATED]: 'Initiated',
      [EnumStatus.PREPARE]: 'Prepare',
    }[status] || '';
  }
}
