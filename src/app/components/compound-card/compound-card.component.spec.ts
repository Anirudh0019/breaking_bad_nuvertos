import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundCardComponent } from './compound-card.component';

describe('CompoundCardComponent', () => {
  let component: CompoundCardComponent;
  let fixture: ComponentFixture<CompoundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
