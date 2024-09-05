import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UuidService } from '../../../core/services/uuid.service';
import { UsersStore } from '../../../core/store/users/user.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUsersList } from '../../../core/store/users/user.selectors';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/model/user.model';
import { SelectComponent } from '../../form/select/select.component';
import { RowComponent } from "../../form/row/row.component";

// Define date formats
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
    MatSelectModule,
    CommonModule,
    SelectComponent,
    RowComponent
],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './modal-create-task.component.html',
  styleUrls: ['./modal-create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateTaskComponent implements OnInit {
  // Get list of users from store
  public listUsers$: Observable<Array<IUser>> = this.userStore.select(getUsersList);

  // Inject MatDialogRef and MAT_DIALOG_DATA
  readonly dialogRef = inject(MatDialogRef<ModalCreateTaskComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  // Define form
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly uuid: UuidService,
    private readonly userStore: Store<UsersStore>,
    private ref: ChangeDetectorRef
  ) {
    // Create a form group with the following fields
    this.form = this.fb.group({
      title: ['', [Validators.required]], // Title field with required validator
      description: ['', [Validators.required]], // Description field with required validator
      createdDate: [''], // Created date field
      expirationDate: ['', [Validators.required]], // Expiration date field with required validator
      status: ['0', [Validators.required]], // Status field with required validator
      user: [null, [Validators.required]] // User field with required validator
    });

    // Set createdDate to today's date
    const today = new Date().toISOString().split('T')[0];

    // Set the createdDate field to today's date
    this.form.controls['createdDate'].setValue(today)
    // Disable the createdDate field
    this.form.controls['createdDate'].disable();
  }

  public ngOnInit(): void {
    // If data is passed in, patch form with data
    if(this.data) {
      const { title, description, createdDate, expirationDate, status, user } = this.data?.task;
      this.form.patchValue({
        title,
        description,
        createdDate,
        expirationDate,
        status,
        user
      });

      this.ref.detectChanges();
    }
  }

  // Close dialog
  public onNoClick(): void {
    this.dialogRef.close();
  }

  // Confirm form and close dialog
  public confirm(): void {
    // Check if the form is valid
    if (this.form.valid) {
      // Close the dialog and pass the form value and task id
      this.dialogRef.close({
        id: this.data?.task?.id || this.uuid.generateUUID(),
        ...this.form.value
      });
    } else {
      // Mark all form controls as touched if the form is not valid
      this.form.markAllAsTouched();
    }
  }
}
