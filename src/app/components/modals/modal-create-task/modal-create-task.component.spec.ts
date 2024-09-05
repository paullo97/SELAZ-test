import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { ModalCreateTaskComponent } from './modal-create-task.component';
import { UsersStore } from '../../../core/store/users/user.store';
import { getUsersList } from '../../../core/store/users/user.selectors';
import { UuidService } from '../../../core/services/uuid.service';
import { IUser } from '../../../core/model/user.model';
import { EnumRole } from '../../../core/model/role.model';

// Mock data
const mockUsers: IUser[] = [
  { id: '1', name: 'User One', role: EnumRole.USER },
  { id: '2', name: 'User Two', role: EnumRole.ADMIN }
];

// Spy objects
const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
const uuidServiceSpy = jasmine.createSpyObj('UuidService', ['generateUUID']);

describe('ModalCreateTaskComponent', () => {
  let component: ModalCreateTaskComponent;
  let fixture: ComponentFixture<ModalCreateTaskComponent>;

  beforeEach(async () => {
    storeSpy.select.and.callFake((selector: any) => {
      if (selector === getUsersList) {
        return of(mockUsers);
      }
      return of(null);
    });

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        CommonModule,
        StoreModule.forRoot({}, {})
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Store, useValue: storeSpy },
        { provide: UuidService, useValue: uuidServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add additional tests as needed
});
