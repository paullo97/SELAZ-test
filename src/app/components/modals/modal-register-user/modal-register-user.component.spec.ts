import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisterUserComponent } from './modal-register-user.component';

describe('ModalRegisterUserComponent', () => {
  let component: ModalRegisterUserComponent;
  let fixture: ComponentFixture<ModalRegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegisterUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
