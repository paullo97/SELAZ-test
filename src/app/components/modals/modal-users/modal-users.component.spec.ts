import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalUsersComponent } from './modal-users.component';
import { getUsersList } from '../../../core/store/users/user.selectors';
import { deleteUser, registerNewUser } from '../../../core/store/users/users.actions';
import { IUser } from '../../../core/model/user.model';
import { ModalRegisterUserComponent } from '../modal-register-user/modal-register-user.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { of as observableOf } from 'rxjs';
import { EnumRole } from '../../../core/model/role.model';

// Mock data
const mockUsers: IUser[] = [
  { id: '1', name: 'User One', role: EnumRole.USER },
  { id: '2', name: 'User Two', role: EnumRole.ADMIN }
];

// Spy objects
const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

describe('ModalUsersComponent', () => {
  let component: ModalUsersComponent;
  let fixture: ComponentFixture<ModalUsersComponent>;

  beforeEach(async () => {
    dialogSpy.open.and.callFake((component: any) => {
      if (component === ModalRegisterUserComponent) {
        return { afterClosed: () => observableOf({ name: 'New User', role: 'USER', id: '3' }) } as any;
      } else if (component === ModalConfirmComponent) {
        return { afterClosed: () => observableOf(true) } as any;
      }
      return { afterClosed: () => observableOf(null) } as any;
    });

    storeSpy.select.and.callFake((selector: any) => {
      if (selector === getUsersList) {
        return observableOf(mockUsers);
      }
      return observableOf(null);
    });

    await TestBed.configureTestingModule({
      imports: [ModalUsersComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Store, useValue: storeSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open register new user modal and dispatch registerNewUser action', () => {
    component.registerNewUserModal();

    expect(dialogSpy.open).toHaveBeenCalledWith(ModalRegisterUserComponent, jasmine.any(Object));
    expect(storeSpy.dispatch).toHaveBeenCalledWith(registerNewUser({
      user: {
        id: '3',
        name: 'New User',
        role: EnumRole.USER
      }
    }));
  });

  it('should open confirm modal and dispatch deleteUser action', () => {
    const userId = '1';
    component.deleteUser(userId);

    expect(dialogSpy.open).toHaveBeenCalledWith(ModalConfirmComponent, jasmine.any(Object));
    expect(storeSpy.dispatch).toHaveBeenCalledWith(deleteUser({ id: userId }));
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should open confirm modal and close dialog with the selected user', () => {
    const user: IUser = { id: '1', name: 'User One', role: EnumRole.USER };
    component.selectUser(user);

    expect(dialogSpy.open).toHaveBeenCalledWith(ModalConfirmComponent, jasmine.any(Object));
    expect(dialogRefSpy.close).toHaveBeenCalledWith(user);
  });
});
