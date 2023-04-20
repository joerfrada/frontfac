import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGradoModalComponent } from './select-grado-modal.component';

describe('SelectGradoModalComponent', () => {
  let component: SelectGradoModalComponent;
  let fixture: ComponentFixture<SelectGradoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectGradoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGradoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
