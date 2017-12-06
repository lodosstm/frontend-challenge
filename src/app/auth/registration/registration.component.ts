import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'task-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.userService.Registration();
  }

  onSubmit() {
    const {username, email, password} = this.form.value;
    const user = new User(email, password, username);

    this.userService.createNewUser(user)
      .subscribe((newuser: User) => {
        if (newuser) {
          this.router.navigate(['/login']);
        }
      });
  }
}
