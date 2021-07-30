import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresFlexiblesComponent } from './valores-flexibles.component';

describe('ValoresFlexiblesComponent', () => {
  let component: ValoresFlexiblesComponent;
  let fixture: ComponentFixture<ValoresFlexiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoresFlexiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresFlexiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
