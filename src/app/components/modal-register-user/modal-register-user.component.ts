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
  public ngOnInit(): void {
    if(this.data.id.length > 0) {
      // After implements request o localStorage or similar
      console.log(this.data);
    }
  }
  readonly dialogRef = inject(MatDialogRef<ModalRegisterUserComponent>);
  readonly data = inject<{ id: string, name: string, role: string}>(MAT_DIALOG_DATA);

  public name: string = '';
  public role: string = '';

  public register(): void {
    console.log(this.name, this.role);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
