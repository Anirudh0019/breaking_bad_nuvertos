import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundEditComponent } from './compound-edit.component';

describe('CompoundEditComponent', () => {
  let component: CompoundEditComponent;
  let fixture: ComponentFixture<CompoundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
