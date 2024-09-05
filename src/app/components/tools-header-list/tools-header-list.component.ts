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
  public userListLength$: Observable<number> = this.userStore.select(getUsersListLength);
  public selectedUser$: Observable<any> = this.userStore.select(getUserSelected);

  @Input()
  public user: any; // FIX After

  @Output()
  public register: EventEmitter<any> = new EventEmitter();

  public userListLength: number = 0;
  public filter: string = 'all';

  constructor(
    public dialog: MatDialog,
    private readonly userStore: Store<UsersStore>,
    private readonly taskStore: Store<TaskStore>,
    private readonly toast: ToastService
  )
  { }

  public ngOnInit(): void {
    this.userListLength$.subscribe((length: number) => {
      this.userListLength = length;
    });
  }

  public showModalRegisterTask() {
    if(this.userListLength === 0) {
       this.toast.showError('You must have at least one registered user to register a task.');
      return;
    }

    const dialogRegisterTask = this.dialog.open(ModalCreateTaskComponent, {
      minHeight: '60vh',
    });

    dialogRegisterTask.afterClosed().subscribe((result: any) => {
      if(result) {
        this.register.emit(result);
      }
    })
  }

  public changeFilter(option: string) {
    this.taskStore.dispatch(changeFilter({
      filter: option
    }));
  }
}
