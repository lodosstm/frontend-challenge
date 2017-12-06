import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

import {UsersService} from '../../shared/services/users.service';

@Component({
  selector: 'task-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.form = this.userService.LogIn();

    this.userService.CheckLocalStorage();
  }

  onSubmit() {
    this.userService.CheckPassword(this.form.value.password);
  }

}
