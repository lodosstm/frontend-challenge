import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {MockUsersService} from '../../shared/services/users.service.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../shared/services/auth.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent],
      imports: [ FormsModule, ReactiveFormsModule, RouterModule, RouterTestingModule.withRoutes([]) ],
      providers: [
        { provide: UsersService, useClass: MockUsersService },
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
