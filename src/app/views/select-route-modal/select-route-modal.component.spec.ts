import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRouteModalComponent } from './select-route-modal.component';

describe('SelectRouteModalComponent', () => {
  let component: SelectRouteModalComponent;
  let fixture: ComponentFixture<SelectRouteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRouteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRouteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
