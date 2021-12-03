import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBigModalComponent } from './select-big-modal.component';

describe('SelectBigModalComponent', () => {
  let component: SelectBigModalComponent;
  let fixture: ComponentFixture<SelectBigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBigModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
