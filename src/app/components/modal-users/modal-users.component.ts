import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ModalRegisterUserComponent } from '../modal-register-user/modal-register-user.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';


@Component({
  selector: 'app-modal-users',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './modal-users.component.html',
  styleUrl: './modal-users.component.scss'
})
export class ModalUsersComponent {
  constructor(public dialog: MatDialog)
  { }

  public registerNewUserModal(id: string) {
    this.dialog.closeAll();
    this.dialog.open(ModalRegisterUserComponent, {
      minWidth: '600px',
      data: {id}
    });
  }

  public deleteUser(id: string): void {
    // After implements request or similar to delete user, and verify if selected user if admin to possibility delete.
    // in poker, this is like a note 5;
    console.log('deleteUser');
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
