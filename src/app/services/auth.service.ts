import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_KEY = 'AIzaSyBzkPhcdyNQM_HepY51WFDLMRU5ljI3x4E';
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  private _user: User | null = null;

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http.post(this.signInUrl, {
      email,
      password,
      returnSecureToken: true
    });
  }

  createUser(email: string, id: string, token: string, expirationDate: Date) {
    this._user = new User(email, id, token, expirationDate);
  }

  get user(): User | null {
    return this._user;
  }

  isAuthenticated(): boolean {
    return !!this._user?.token;
  }

  signOut(): void {
    this._user = null;
    localStorage.removeItem('user');
  }

  autoLogin(): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const { email, id, _token, _expirationDate } = JSON.parse(userData);
    const loadedUser = new User(email, id, _token, new Date(_expirationDate));

    if (loadedUser.token) {
      this._user = loadedUser;
    }
  }

  checkAdmin(): boolean {
    const ADMIN_UID = 'jienCM2ANnPZ64oc2530CM6QJbc2';
    return this._user?.id === ADMIN_UID;
  }

}
