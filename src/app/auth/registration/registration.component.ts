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
    const user = new User(this.form.value.username, this.form.value.email, this.form.value.password);

    this.userService.createNewUser(user)
      .subscribe((newuser: User) => {
        if (newuser) {
          this.router.navigate(['/login']);
        }
      });
  }
}
