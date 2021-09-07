import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiramidesComponent } from './piramides.component';

describe('PiramidesComponent', () => {
  let component: PiramidesComponent;
  let fixture: ComponentFixture<PiramidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiramidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiramidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
