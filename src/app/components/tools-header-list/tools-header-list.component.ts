import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ModalCreateTaskComponent } from '../modals/modal-create-task/modal-create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

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
    MatOptionModule
  ],
  templateUrl: './tools-header-list.component.html',
  styleUrl: './tools-header-list.component.scss'
})
export class ToolsHeaderListComponent {
  @Input()
  public user: any; // FIX After

  @Output()
  public register: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
  )
  { }

  public showModalRegisterTask() {
    const dialogRegisterTask = this.dialog.open(ModalCreateTaskComponent, {
      minHeight: '60vh',
    });

    dialogRegisterTask.afterClosed().subscribe((result: any) => {
      if(result) {
        this.register.emit(result);
      }
    })
  }
}
