import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesUsersComponent } from './profiles-users.component';

describe('ProfilesUsersComponent', () => {
  let component: ProfilesUsersComponent;
  let fixture: ComponentFixture<ProfilesUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
