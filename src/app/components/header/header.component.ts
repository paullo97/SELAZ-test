import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ModalUsersComponent } from '../modal-users/modal-users.component';
import { LocalStorageService } from '../../core/services/local-storage.service';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnChanges{
  public selectUser: any = {};
  public listUsersLength = 0;

  constructor(
    public dialog: MatDialog,
    private localStorage: LocalStorageService<any>
  )
  { }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  public ngOnInit(): void {
    this.listUsersLength = this.localStorage.getItem('listUsers').length;
  }

  public openDialogUser() {
    const dialogUsers = this.dialog.open(ModalUsersComponent, {
      minWidth: '600px',
    });

    dialogUsers.afterClosed().subscribe((result) => {
      if(result) {
        this.localStorage.setItem('selectUser', result);
        this.selectUser = result;
      }

      console.log(this.localStorage.getItem('listUsers').length);
      this.listUsersLength = this.localStorage.getItem('listUsers').length;
    })
  }
}
