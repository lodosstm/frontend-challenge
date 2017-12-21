export class AuthService {
  constructor () {

  }
  public isAuthorated = false;

  logIn() {
    this.isAuthorated = true;
  }
}
