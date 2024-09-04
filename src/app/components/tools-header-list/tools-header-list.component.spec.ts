import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsHeaderListComponent } from './tools-header-list.component';

describe('ToolsHeaderListComponent', () => {
  let component: ToolsHeaderListComponent;
  let fixture: ComponentFixture<ToolsHeaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsHeaderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolsHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
