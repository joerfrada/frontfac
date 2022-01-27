import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPrivilegiosComponent } from './roles-privilegios.component';

describe('RolesPrivilegiosComponent', () => {
  let component: RolesPrivilegiosComponent;
  let fixture: ComponentFixture<RolesPrivilegiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPrivilegiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPrivilegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
