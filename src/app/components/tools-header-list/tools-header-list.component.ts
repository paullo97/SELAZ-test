import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalCreateTaskComponent } from '../modals/modal-create-task/modal-create-task.component';

@Component({
  selector: 'app-tools-header-list',
  standalone: true,
  imports: [
    MatButton,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
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
      minHeight: '60vh'
    })

    dialogRegisterTask.afterClosed().subscribe((result: any) => {
      if(result) {
        this.register.emit(result);
      }
    })
  }
}
