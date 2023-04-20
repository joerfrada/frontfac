import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerModalComponent } from './ver-modal.component';

describe('VerModalComponent', () => {
  let component: VerModalComponent;
  let fixture: ComponentFixture<VerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
