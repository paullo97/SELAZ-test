// Importing necessary modules and services
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
import { UuidService } from '../../../core/services/uuid.service';
import { IUser } from '../../../core/model/user.model';


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
  // Injecting UuidService
  constructor(
    private uuid: UuidService
  )
  { }

  // OnInit lifecycle hook to set the name, role and id of the user if data is available
  public ngOnInit(): void {
    if(this.data) {
      const { name, role, id } = this.data;
      this.name = name;
      this.role = role;
      this.id = id;
    }
  }

  // Injecting MatDialogRef and MAT_DIALOG_DATA
  readonly dialogRef = inject(MatDialogRef<ModalRegisterUserComponent>);
  readonly data = inject<IUser>(MAT_DIALOG_DATA);

  // Declaring variables to store the name, role and id of the user
  public name: string = '';
  public role: string = '';
  public id: string = '';


  // This function is used to register a new user
  public register(): void {
    // Close the dialog and pass the user's id, name, and role
    this.dialogRef.close({
      id: this.id || this.uuid.generateUUID(),
      name: this.name,
      role: this.role
    });
    // Reset the name, role, and id variables
    this.name = '';
    this.role = '';
    this.id = '';
  }

  // Method to close the dialog without passing any data
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
