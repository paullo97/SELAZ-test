import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResumeTaskComponent } from './modal-resume-task.component';

describe('ModalResumeTaskComponent', () => {
  let component: ModalResumeTaskComponent;
  let fixture: ComponentFixture<ModalResumeTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResumeTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalResumeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
