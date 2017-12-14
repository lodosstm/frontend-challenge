export class AuthService {
  public isAuthorated = false;

  logIn() {
    this.isAuthorated = true;
  }
}
