import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiramideModalComponent } from './piramide-modal.component';

describe('PiramideModalComponent', () => {
  let component: PiramideModalComponent;
  let fixture: ComponentFixture<PiramideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiramideModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiramideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
