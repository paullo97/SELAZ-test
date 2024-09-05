import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalRegisterUserComponent } from '../modal-register-user/modal-register-user.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { Store } from '@ngrx/store';
import { UsersStore } from '../../../core/store/users/user.store';
import { getUsersList } from '../../../core/store/users/user.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { deleteUser, editUser, registerNewUser } from '../../../core/store/users/users.actions';
import { IUser } from '../../../core/model/user.model';

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
    MatButtonModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './modal-users.component.html',
  styleUrl: './modal-users.component.scss'
})
export class ModalUsersComponent {
  // Get the list of users from the store
  public listUsers$: Observable<Array<IUser>> = this.userStore.select(getUsersList); // FIX

  // Inject the MatDialogRef to close the dialog
  readonly dialogRef = inject(MatDialogRef<ModalUsersComponent>);

  constructor(
    public dialog: MatDialog,
    private userStore: Store<UsersStore>
  ) { }

  // Open the register user modal and dispatch the registerNewUser action if the user is not already registered
  public registerNewUserModal(user?: IUser) { //fix
    const dialogRegister = this.dialog.open(ModalRegisterUserComponent, {
      minWidth: '600px',
      data: { ...user }
    });

    // Subscribe to the afterClosed event of the dialogRegister
    dialogRegister.afterClosed().subscribe(result => {
      // Check if the result is true
      if (result) {
        // Destructure the result to get the name, role and id
        const { name, role, id } = result;
        // Check if the user is not defined
        if(!user) {
          // Dispatch an action to register a new user
          this.userStore.dispatch(
            registerNewUser({
              user: {
                id,
                name,
                role
              }
            })
          )
        }
        // If the user is defined
        else {
          // Dispatch an action to edit the user
          this.userStore.dispatch(editUser({
            user: {
              id,
              name,
              role
            }
          }))
        }
      }
    });
  }


  // Open the confirm modal and dispatch the deleteUser action if the user confirms
  public deleteUser(id: string): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userStore.dispatch(deleteUser({ id }));
      }

      this.dialogRef.close();
    });
  }

  // Open the confirm modal and close the dialog with the selected user if the user confirms
  public selectUser(user: IUser) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '300px'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close(user);
    })
  }
}
