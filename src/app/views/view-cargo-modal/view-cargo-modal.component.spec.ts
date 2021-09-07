import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCargoModalComponent } from './view-cargo-modal.component';

describe('ViewCargoModalComponent', () => {
  let component: ViewCargoModalComponent;
  let fixture: ComponentFixture<ViewCargoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCargoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCargoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
