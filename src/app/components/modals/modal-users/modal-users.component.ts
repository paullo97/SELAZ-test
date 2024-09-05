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
  public listUsers$: Observable<Array<any>> = this.userStore.select(getUsersList); // FIX

  readonly dialogRef = inject(MatDialogRef<ModalUsersComponent>);

  constructor(
    public dialog: MatDialog,
    private userStore: Store<UsersStore>
  ) { }

  public registerNewUserModal(user?: any) { //fix
    console.log(user);
    const dialogRegister = this.dialog.open(ModalRegisterUserComponent, {
      minWidth: '600px',
      data: { ...user }
    });

    dialogRegister.afterClosed().subscribe(result => {
      if (result) {
        const { name, role, id } = result;
        if(!user) {
          this.userStore.dispatch(
            registerNewUser({
              user: {
                id,
                name,
                role
              }
            } as any)
          )
        }
        else {
          this.userStore.dispatch(editUser({
            user: {
              id,
              name,
              role
            }
          } as any))
        }
      }
    });
  }


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

  public selectUser(user: any) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '300px'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close(user);
    })
  }
}
