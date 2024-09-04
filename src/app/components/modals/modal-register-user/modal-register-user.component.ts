import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { UuidService } from '../../../core/services/uuid.service';
@Component({
  selector: 'app-modal-register-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './modal-register-user.component.html',
  styleUrl: './modal-register-user.component.scss'
})
export class ModalRegisterUserComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService<any>,
    private uuid: UuidService
  )
  { }

  public ngOnInit(): void {
    if(this.data.id.length > 0) {
      // After implements request o localStorage or similar
      // FIX after when this works
      const { name, role, id } = this.localStorage.getItem('listUsers').filter((user: any) => user.id === this.data.id)[0];
      this.name = name;
      this.role = role;
      this.id = id;
    }
  }

  readonly dialogRef = inject(MatDialogRef<ModalRegisterUserComponent>);
  readonly data = inject<{ id: string, name: string, role: string}>(MAT_DIALOG_DATA);

  public name: string = '';
  public role: string = '';
  protected id: string = '';

  public register(): void {
    this.dialogRef.close({
      id: this.id || this.uuid.generateUUID(),
      name: this.name,
      role: this.role
    });
    this.name = '';
    this.role = '';
    this.id = '';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
