import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCheckboxModalComponent } from './table-checkbox-modal.component';

describe('TableCheckboxModalComponent', () => {
  let component: TableCheckboxModalComponent;
  let fixture: ComponentFixture<TableCheckboxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCheckboxModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCheckboxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
