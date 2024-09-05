import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmComponent } from './modal-confirm.component';
import { of, Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalConfirmComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ModalConfirmComponent,
        MatButtonModule,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalConfirmComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with no result when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog with "confirm" result when confirm is called', () => {
    component.confirm();
    expect(dialogRef.close).toHaveBeenCalledWith('confirm');
  });
});
