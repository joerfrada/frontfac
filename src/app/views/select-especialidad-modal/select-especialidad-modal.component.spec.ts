import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEspecialidadModalComponent } from './select-especialidad-modal.component';

describe('SelectEspecialidadModalComponent', () => {
  let component: SelectEspecialidadModalComponent;
  let fixture: ComponentFixture<SelectEspecialidadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEspecialidadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEspecialidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
