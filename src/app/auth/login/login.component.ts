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

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.form = this.usersService.LogIn();

    this.usersService.CheckLocalStorage();
  }

  onSubmit() {
    this.usersService.CheckPassword(this.form.value.username, this.form.value.password);
  }

}
