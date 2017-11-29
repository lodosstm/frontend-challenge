import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'task-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    const formData = this.form.value;

    this.userService.getUserByUsername(formData.username).subscribe((user: User)=>{
      if(user){
        if(user.password == formData.password){
          this.authService.logIn();
          // this.router.navigate('');
          window.localStorage.setItem('user', JSON.stringify(user));
        }else{
          alert('Password is wrong!')
        }
      }else{
        alert('This username is not exist!');
      }
    });
  }

}
