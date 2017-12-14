import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class UsersService extends BaseApi {
  constructor (public http: Http,
               private authService: AuthService,
               private router: Router ) {
    super(http);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.get(`users?username=${username}`)
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  LogIn() {
    return new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  CheckPassword(username, password) {
    this.getUserByUsername(username).subscribe((data: User) => {
      if (data) {
        if (data.password === password) {
          this.authService.logIn();
          this.router.navigate(['/system']);
          window.localStorage.setItem('username', data.username);
          window.localStorage.setItem('password', data.password);
        } else {
          alert('Password is wrong!');
        }
      } else {
        alert('This username is not exist!');
      }
    });
  }

  CheckLocalStorage() {
    if (window.localStorage.getItem('username')) {
      this.getUserByUsername(window.localStorage.getItem('username')).subscribe((user: User) => {
        if (user) {
          if (user.password === window.localStorage.getItem('password')) {
            this.authService.logIn();
            this.router.navigate(['/system']);
          }
        }
      });
    }
  }

  Registration() {
    return new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }
}
