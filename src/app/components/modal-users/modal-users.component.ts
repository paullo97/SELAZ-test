import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { ModalRegisterUserComponent } from '../modal-register-user/modal-register-user.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalStorageService } from '../../core/services/local-storage.service';


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
    MatTooltipModule
  ],
  templateUrl: './modal-users.component.html',
  styleUrl: './modal-users.component.scss'
})
export class ModalUsersComponent implements OnInit {
  public listUsers: Array<any> = [];

  readonly dialogRef = inject(MatDialogRef<ModalUsersComponent>);

  constructor(
    public dialog: MatDialog,
    private localStorage: LocalStorageService<any>
  ) { }

  public ngOnInit(): void {
    this.listUsers = this.localStorage.getItem('listUsers');
  }

  public registerNewUserModal(id: string) {
    const dialogRegister = this.dialog.open(ModalRegisterUserComponent, {
      minWidth: '600px',
      data: { id }
    });

    dialogRegister.afterClosed().subscribe(result => {
      if (result) {

        if(id.length === 0) {
          // Pega a lista de usuários do localStorage ou inicializa com um array vazio
          const listUsers = this.localStorage.getItem('listUsers') || [];

          // Verifica se a lista é um array válido
          const updatedUsers = Array.isArray(listUsers) ? [...listUsers, {
            id: result.id,
            name: result.name,
            role: result.role
          }] : [{
            id: result.id,
            name: result.name,
            role: result.role
          }];

          // Atualiza o localStorage com a nova lista
          this.localStorage.setItem('listUsers', updatedUsers);
          this.listUsers = updatedUsers;
        }
        else {
          const listUsers = this.localStorage.getItem('listUsers');
          const updatedList = listUsers.map((user: any) => {
            if(user.id === id) {
              return {
                ...user,
                name: result.name,
                role: result.role
              }
            }
            return user;
          });
          this.localStorage.setItem('listUsers', updatedList);
        }
      }
      this.dialogRef.close();
    });
  }


  public deleteUser(id: string): void {
    // After implements request or similar to delete user, and verify if selected user if admin to possibility delete.
    // in poker, this is like a note 5;
    console.log('deleteUser');
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (result) {
        const listUsers = this.localStorage.getItem('listUsers');
        const updatedListUsers = listUsers.filter((user: any) => user.id !== id)
        this.localStorage.setItem('listUsers', updatedListUsers);
        this.listUsers = updatedListUsers;
      }
    });

    this.dialogRef.close();
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
