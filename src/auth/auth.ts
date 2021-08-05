interface IAuth {
  authenticated: boolean;
  login: (cb: () => void) => void;
  logout: (cb: () => void) => void;
  isAuthenticated: () => boolean;
}
class Auth implements IAuth {
  authenticated = true;

  login(cb: () => void) {
    this.authenticated = true;
    cb();
  }

  logout(cb: () => void) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
