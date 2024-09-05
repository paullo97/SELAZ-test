import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalRegisterUserComponent } from './modal-register-user.component';
import { UuidService } from '../../../core/services/uuid.service';

describe('ModalRegisterUserComponent', () => {
  let component: ModalRegisterUserComponent;
  let fixture: ComponentFixture<ModalRegisterUserComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalRegisterUserComponent>>;
  let uuidService: jasmine.SpyObj<UuidService>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const uuidServiceSpy = jasmine.createSpyObj('UuidService', ['generateUUID']);
    uuidServiceSpy.generateUUID.and.returnValue('1234-5678');

    await TestBed.configureTestingModule({
      imports: [ModalRegisterUserComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: UuidService, useValue: uuidServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }  // Mock MAT_DIALOG_DATA if needed
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegisterUserComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalRegisterUserComponent>>;
    uuidService = TestBed.inject(UuidService) as jasmine.SpyObj<UuidService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with correct data when register is called', () => {
    component.name = 'John Doe';
    component.role = 'USER';
    component.id = '';

    component.register();

    expect(dialogRef.close).toHaveBeenCalledWith({
      id: '1234-5678',
      name: 'John Doe',
      role: 'USER'
    });
    expect(component.name).toBe('');
    expect(component.role).toBe('');
    expect(component.id).toBe('');
  });

  it('should close dialog without data when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should initialize with data if provided', () => {
    const data = { name: 'Jane Doe', role: 'ADMIN', id: 'existing-id' };
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: data });
    fixture.detectChanges();

    expect(component.name).toBe(data.name);
    expect(component.role).toBe(data.role);
    expect(component.id).toBe(data.id);
  });
});
