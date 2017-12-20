import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import * as of from 'rxjs/add/Observable/of';


@Injectable()
export class MockUsersService {
  constructor () { }

  getUserByUsername(username: string) {
    return {
    username: 'username',
    password: 'password',
    email: 'email',
    id: 1
  }; }

  createNewUser(user: User): Observable<User> {
    return Observable.of({
      username: 'username',
      password: 'password',
      email: 'email',
      id: 1
    });
  }

  LogIn() {
    return new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  CheckPassword(password: string) { }

  CheckLocalStorage() { }

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
