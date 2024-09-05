import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { UuidService } from '../../../core/services/uuid.service';
import { UsersStore } from '../../../core/store/users/user.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUsersList } from '../../../core/store/users/user.selectors';
import { CommonModule } from '@angular/common';

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
    CommonModule
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
  public listUsers$: Observable<Array<any>> = this.userStore.select(getUsersList);

  readonly dialogRef = inject(MatDialogRef<ModalCreateTaskComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  public form: FormGroup;
  public listUsers: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private readonly localStorage: LocalStorageService<any>, //FIX Me Later,
    private readonly uuid: UuidService,
    private readonly userStore: Store<UsersStore>,
    private ref: ChangeDetectorRef
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

  public ngOnInit(): void {
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

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        id: this.data?.task?.id || this.uuid.generateUUID(),
        ...this.form.value
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
