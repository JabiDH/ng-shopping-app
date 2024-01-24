export class User {
  constructor(
    public email: string,
    private _token: string | null,
    private _tokenExpireDate: Date
  ) {}

  getToken() {
    if (this._token && new Date() > this._tokenExpireDate) {
      return null;
    }
    return this._token;
  }
}
