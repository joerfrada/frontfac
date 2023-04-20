import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiglasComponent } from './siglas.component';

describe('SiglasComponent', () => {
  let component: SiglasComponent;
  let fixture: ComponentFixture<SiglasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiglasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
