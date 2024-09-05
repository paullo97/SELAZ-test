import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { ToastService } from './core/services/toasts.service';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { ComponentsModule } from './components/components.module';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let mockStore: jasmine.SpyObj<any>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Simular o ToastService
    mockToastService = jasmine.createSpyObj('ToastService', ['showToast']);

    // Criar um mock do Store
    mockStore = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        ComponentsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { useValue: mockStore },
        { provide: ToastService, useValue: mockToastService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show a toast message when there are no registered users', () => {
    // Configurar o mock para retornar 0 usuários
    mockStore.select.and.returnValue(of(0));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Triggers ngOnInit

    // Verificar se o ToastService.showToast foi chamado com os parâmetros corretos
    expect(mockToastService.showToast).toHaveBeenCalledWith(
      'You no Have Registered Users, please register one user, and after register Tasks',
      'OK',
      5000
    );
  });

  it('should not show a toast message when there are registered users', () => {
    // Configurar o mock para retornar 5 usuários
    mockStore.select.and.returnValue(of(5));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Triggers ngOnInit

    // Verificar se o ToastService.showToast não foi chamado
    expect(mockToastService.showToast).not.toHaveBeenCalled();
  });
});
