import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListContainerComponent } from './list-container.component';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ITask } from '../../core/model/task.model';
import { EnumStatus } from '../../core/model/status.model';
import { EnumRole } from '../../core/model/role.model';

describe('ListContainerComponent', () => {
  // Declare variables to be used in the tests
  let component: ListContainerComponent;
  let fixture: ComponentFixture<ListContainerComponent>;
  let store: MockStore;

  // Create a mock task object
  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    description: 'Description of test task',
    dataCriacao: '2024-09-05',
    dataVencimento: '2024-09-10',
    status: EnumStatus.INITIATED,
    responsavel: EnumRole.ADMIN,
    user: {
      id: 'user1',
      name: 'John Doe',
      role: EnumRole.ADMIN
    }
  };

  // Set up the test environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListContainerComponent, MatDialogModule, StoreModule.forRoot({})],
      providers: [provideMockStore({})]
    }).compileComponents();

    // Inject the mock store and create the component
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the task status is correctly identified
  it('should correctly identify task status as "Initiated"', () => {
    const status = component.identifyStatus(EnumStatus.INITIATED);
    expect(status).toBe('Initiated');
  });

  // Test to check if the nextStepTask action is dispatched when handleCompleteTask is called
  it('should dispatch nextStepTask action when handleCompleteTask is called', () => {
    spyOn(store, 'dispatch');
    component.handleCompleteTask(mockTask.id, true);
    expect(store.dispatch).toHaveBeenCalled();
  });

  // Test to check if the editTask action is dispatched when handleEditTask is called
  it('should dispatch editTask action when handleEditTask is called', () => {
    spyOn(store, 'dispatch');
    component.handleEditTask(mockTask);
    expect(store.dispatch).toHaveBeenCalled();
  });

  // Test to check if the removeTask action is dispatched when handleDeleteTask is called
  it('should dispatch removeTask action when handleDeleteTask is called', () => {
    spyOn(store, 'dispatch');
    component.handleDeleteTask(mockTask.id);
    expect(store.dispatch).toHaveBeenCalled();
  });

  // Test to check if the registerNewTask action is dispatched when handleRegisterTask is called
  it('should dispatch registerNewTask action when handleRegisterTask is called', () => {
    spyOn(store, 'dispatch');
    component.handleRegisterTask(mockTask);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
