export interface ILogin {
  username: string;
  password: string;
}

export interface ISignup {
  name: string;
  username: string;
  email: string;
  password: string;
}

export class User {
  constructor(
    public name: string,
    public username: string,
    public profile: string,
    private _token: string,
    private _expiresIn: Date
  ) {}

  get token() {
    if (!this._expiresIn || new Date() > this._expiresIn) {
      return null;
    }
    return this._token;
  }
}
