import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskStore } from '../../../core/store/task/task.store';
import { getInfoResume, getUserWithMostTasks } from '../../../core/store/task/task.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IResume } from '../../../core/model/resume.model';
import { IUser } from '../../../core/model/user.model';

@Component({
  selector: 'app-modal-resume-task',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './modal-resume-task.component.html',
  styleUrl: './modal-resume-task.component.scss'
})
export class ModalResumeTaskComponent {
  // Inject MatDialogRef to close the dialog
  readonly dialogRef = inject(MatDialogRef<ModalResumeTaskComponent>);

  // Get the resume info from the store
  public resumeInfo$: Observable<IResume> = this.taskStore.select(getInfoResume);
  // Get the user with the most tasks from the store
  public userMostTasks$: Observable<IUser | null> = this.taskStore.select(getUserWithMostTasks);

  constructor(private readonly taskStore: Store<TaskStore>)
  { }

  // Close the dialog when the no button is clicked
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
