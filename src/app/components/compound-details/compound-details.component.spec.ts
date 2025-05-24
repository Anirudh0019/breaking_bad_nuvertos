import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundDetailsComponent } from './compound-details.component';

describe('CompoundDetailsComponent', () => {
  let component: CompoundDetailsComponent;
  let fixture: ComponentFixture<CompoundDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
