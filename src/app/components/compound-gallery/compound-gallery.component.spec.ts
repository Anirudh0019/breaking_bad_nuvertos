import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundGalleryComponent } from './compound-gallery.component';

describe('CompoundGalleryComponent', () => {
  let component: CompoundGalleryComponent;
  let fixture: ComponentFixture<CompoundGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
