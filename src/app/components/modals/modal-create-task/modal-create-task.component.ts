import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { UuidService } from '../../../core/services/uuid.service';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-modal-create-task',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './modal-create-task.component.html',
  styleUrls: ['./modal-create-task.component.scss']
})
export class ModalCreateTaskComponent {
  readonly dialogRef = inject(MatDialogRef<ModalCreateTaskComponent>);

  public form: FormGroup;
  public listUsers: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private readonly localStorage: LocalStorageService<any>, //FIX Me Later,
    private readonly uuid: UuidService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdDate: [''],
      expirationDate: ['', [Validators.required]],
      status: ['0', [Validators.required]],
      user: [null, [Validators.required]]
    });

    const today = new Date().toISOString().split('T')[0];

    this.form.controls['createdDate'].setValue(today)
    this.form.controls['createdDate'].disable();

    this.listUsers = this.localStorage.getItem('listUsers'); //Call Enum
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        id: this.uuid.generateUUID(),
        ...this.form.value
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
