import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ModalUsersComponent } from '../modals/modal-users/modal-users.component';
import { ModalResumeTaskComponent } from '../modals/modal-resume-task/modal-resume-task.component';
import { setSelectedUser } from '../../core/store/users/users.actions';
import { IUser } from '../../core/model/user.model';
import { EnumRole } from '../../core/model/role.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockStore: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    // Simulando o retorno de afterClosed como um Observable
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(undefined) });
    mockDialog.open.and.returnValue(dialogRefSpy);

    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of(0));

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the user dialog and dispatch setSelectedUser when a user is selected', () => {
    // Mock dialog return with valid user
    const selectedUser: IUser = { id: '1', name: 'User 1', role: EnumRole.USER };
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', { afterClosed: of(selectedUser) });
    mockDialog.open.and.returnValue(dialogRefSpy);

    // Triggers the method of opening the user dialog
    component.openDialogUser();

    // Checks if the dialog was opened with the correct component
    expect(mockDialog.open).toHaveBeenCalledWith(ModalUsersComponent, { minWidth: '600px' });

    // Checks if the action was dispatched with the correct user
    expect(mockStore.dispatch).toHaveBeenCalledWith(setSelectedUser({ user: selectedUser }));
  });

  it('should not dispatch setSelectedUser if no user is selected', () => {
    // Mock dialog return with undefined result
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', { afterClosed: of(undefined) });
    mockDialog.open.and.returnValue(dialogRefSpy);

    // Triggers the method of opening the user dialog
    component.openDialogUser();

    // Checks if the dialog has been opened
    expect(mockDialog.open).toHaveBeenCalledWith(ModalUsersComponent, { minWidth: '600px' });

    // Checks if the action has NOT been dispatched
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should open the resume task dialog', () => {
    // Mock task dialog return
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(undefined) });
    mockDialog.open.and.returnValue(dialogRefSpy);

    // Triggers the method of opening the task dialog
    component.showResume();

    // Checks if the dialog was opened with the correct component
    expect(mockDialog.open).toHaveBeenCalledWith(ModalResumeTaskComponent, { minWidth: '600px' });
  });
});
