import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalResumeTaskComponent } from './modal-resume-task.component';
import { TaskStore } from '../../../core/store/task/task.store';
import { getInfoResume, getUserWithMostTasks } from '../../../core/store/task/task.selectors';
import { IResume } from '../../../core/model/resume.model';
import { IUser } from '../../../core/model/user.model';
import { EnumRole } from '../../../core/model/role.model';

// Mock data for testing
const mockResumeInfo: IResume = {
  total: 0,
  prepare: 0,
  initiated: 0,
  completed: 0
};

const mockUser: IUser = {
  id: 'user-id',
  name: 'John Doe',
  role: EnumRole.ADMIN
};

describe('ModalResumeTaskComponent', () => {
  let component: ModalResumeTaskComponent;
  let fixture: ComponentFixture<ModalResumeTaskComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalResumeTaskComponent>>;
  let store: jasmine.SpyObj<Store<TaskStore>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const storeSpy = jasmine.createSpyObj('Store', ['select']);

    storeSpy.select.and.callFake((selector: any) => {
      if (selector === getInfoResume) {
        return of(mockResumeInfo);
      } else if (selector === getUserWithMostTasks) {
        return of(mockUser);
      }
      return of(null);
    });

    await TestBed.configureTestingModule({
      imports: [ModalResumeTaskComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Store, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResumeTaskComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalResumeTaskComponent>>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<TaskStore>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should retrieve resume info from the store', (done) => {
    component.resumeInfo$.subscribe(resumeInfo => {
      expect(resumeInfo).toEqual(mockResumeInfo);
      done();
    });
  });

  it('should retrieve user with most tasks from the store', (done) => {
    component.userMostTasks$.subscribe(user => {
      expect(user).toEqual(mockUser);
      done();
    });
  });
});
