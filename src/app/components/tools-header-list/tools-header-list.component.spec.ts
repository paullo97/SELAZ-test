import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsHeaderListComponent } from './tools-header-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Import here
import { IUser } from '../../core/model/user.model';
import { ITask } from '../../core/model/task.model';
import { changeFilter } from '../../core/store/task/task.actions';
import { ToastService } from '../../core/services/toasts.service';
import { ModalCreateTaskComponent } from '../modals/modal-create-task/modal-create-task.component';
import { getUserSelected, getUsersListLength } from '../../core/store/users/user.selectors';
import { EnumRole } from '../../core/model/role.model';
import { EnumStatus } from '../../core/model/status.model';
import { StoreModule } from '../../core/store/store.module';

describe('ToolsHeaderListComponent', () => {
  let component: ToolsHeaderListComponent;
  let fixture: ComponentFixture<ToolsHeaderListComponent>;
  let store: MockStore;
  let toastService: ToastService;

  const mockUser: IUser = {
    id: 'user1',
    name: 'John Doe',
    role: EnumRole.ADMIN
  };

  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    description: 'Description of test task',
    dataCriacao: '2024-09-05',
    dataVencimento: '2024-09-10',
    status: EnumStatus.INITIATED,
    responsavel: EnumRole.ADMIN,
    user: mockUser
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToolsHeaderListComponent,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatBadgeModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule,
        BrowserAnimationsModule, // <-- Add here
        StoreModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: getUsersListLength,
              value: 1
            },
            {
              selector: getUserSelected,
              value: mockUser
            }
          ]
        }),
        { provide: ToastService, useValue: { showError: jasmine.createSpy() } }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(ToolsHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showError if userListLength is 0', () => {
    spyOn(toastService, 'showError');
    store.overrideSelector(getUsersListLength, 0);
    fixture.detectChanges();

    component.showModalRegisterTask();
    expect(toastService.showError).toHaveBeenCalledWith('You must have at least one registered user to register a task.');
  });

  it('should emit register event when a task is registered', () => {
    spyOn(component.register, 'emit');
    store.overrideSelector(getUsersListLength, 1);
    fixture.detectChanges();

    const dialogRef = TestBed.inject(MatDialog).open(ModalCreateTaskComponent);
    dialogRef.afterClosed().subscribe(() => {
      component.register.emit(mockTask);
      expect(component.register.emit).toHaveBeenCalledWith(mockTask);
    });
  });

  it('should dispatch changeFilter action when changeFilter is called', () => {
    spyOn(store, 'dispatch');
    component.changeFilter('completed');
    expect(store.dispatch).toHaveBeenCalledWith(changeFilter({ filter: 'completed' }));
  });
});
