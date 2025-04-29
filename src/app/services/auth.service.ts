import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly correctPassword = '77689';
  private isAdminAccess: boolean = false;

  get adminPassword(): string {
    return this.correctPassword;
  }

  isAdmin(password: string): boolean {
    if(password === this.correctPassword){
      this.isAdminAccess = true;
      return true;
    }
    return false;
  }

  checkAdmin(){
    const storedPassword = localStorage.getItem('isAdmin');
    return storedPassword === this.correctPassword;
  }

}
