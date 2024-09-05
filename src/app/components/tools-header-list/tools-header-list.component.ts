import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ModalCreateTaskComponent } from '../modals/modal-create-task/modal-create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersStore } from '../../core/store/users/user.store';
import { getUserSelected, getUsersListLength } from '../../core/store/users/user.selectors';
import { ToastService } from '../../core/services/toasts.service';
import { TaskStore } from '../../core/store/task/task.store';
import { changeFilter } from '../../core/store/task/task.actions';
import { IUser } from '../../core/model/user.model';
import { ITask } from '../../core/model/task.model';

@Component({
  selector: 'app-tools-header-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule
  ],
  templateUrl: './tools-header-list.component.html',
  styleUrl: './tools-header-list.component.scss'
})
export class ToolsHeaderListComponent implements OnInit{
  // Observable to get the length of the user list
  public userListLength$: Observable<number> = this.userStore.select(getUsersListLength);
  // Observable to get the selected user
  public selectedUser$: Observable<IUser> = this.userStore.select(getUserSelected);

  // Input to get the user
  @Input()
  public user: IUser | null | undefined ;

  // Output to emit the registered task
  @Output()
  public register: EventEmitter<ITask> = new EventEmitter();

  // Variable to store the length of the user list
  public userListLength: number = 0;
  // Variable to store the filter
  public filter: string = 'all';

  constructor(
    // Injecting MatDialog to open the modal
    public dialog: MatDialog,
    // Injecting Store to get the user list length and selected user
    private readonly userStore: Store<UsersStore>,
    // Injecting Store to dispatch the changeFilter action
    private readonly taskStore: Store<TaskStore>,
    // Injecting ToastService to show error messages
    private readonly toast: ToastService
  )
  { }

  // OnInit lifecycle hook to subscribe to the userListLength$ observable
  public ngOnInit(): void {
    this.userListLength$.subscribe((length: number) => {
      this.userListLength = length;
    });
  }

  // Method to open the modal to register a task
  public showModalRegisterTask() {
    // If there are no users registered, show an error message
    if(this.userListLength === 0) {
       this.toast.showError('You must have at least one registered user to register a task.');
      return;
    }

    // Open the modal to register a task
    const dialogRegisterTask = this.dialog.open(ModalCreateTaskComponent, {
      minHeight: '60vh',
    });

    // Subscribe to the afterClosed event of the modal to emit the registered task
    dialogRegisterTask.afterClosed().subscribe((result: ITask) => {
      if(result) {
        this.register.emit(result);
      }
    })
  }

  // Method to change the filter
  public changeFilter(option: string) {
    // Dispatch the changeFilter action with the selected filter
    this.taskStore.dispatch(changeFilter({
      filter: option
    }));
  }
}
