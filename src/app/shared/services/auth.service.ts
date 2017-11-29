export class AuthService{
  private isAuthorated = false;

  logIn(){
    this.isAuthorated = true;
  }

  logOut(){
    this.isAuthorated = false;
    window.localStorage.clear();
  }

  isLoggedIn():boolean{
    return this.isAuthorated;
  }
}
