export class AuthService {
  private isAuthorated = false;

  logIn() {
    this.isAuthorated = true;
  }
}
