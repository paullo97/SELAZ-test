import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import { ModalUsersComponent } from '../modals/modal-users/modal-users.component';
import { Store } from '@ngrx/store';
import { UsersStore } from '../../core/store/users/user.store';
import { Observable } from 'rxjs';
import { getUserSelected, getUsersListLength } from '../../core/store/users/user.selectors';
import { CommonModule } from '@angular/common';
import { setSelectedUser } from '../../core/store/users/users.actions';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public usersQtd$: Observable<any> = this.store.select(getUsersListLength);
  public selectedUser$: Observable<any> = this.store.select(getUserSelected);

  constructor(
    public dialog: MatDialog,
    private store: Store<UsersStore>
  )
  { }

  public openDialogUser() {
    const dialogUsers = this.dialog.open(ModalUsersComponent, {
      minWidth: '600px',
    });

    dialogUsers.afterClosed().subscribe((result) => {
      if(result) {
        this.store.dispatch(setSelectedUser({
          user: result
        }));
      }
    })
  }
}
