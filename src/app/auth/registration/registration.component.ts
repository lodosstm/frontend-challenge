import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UsersService} from "../../shared/services/users.service";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";

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
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {username, email, password} = this.form.value;
    const user = new User(email, password, username);

    this.userService.createNewUser(user)
      .subscribe((user: User)=>{
        this.router.navigate(['/login']);
      })
  }
}
