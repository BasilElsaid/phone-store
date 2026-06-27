import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DarkModeBackgroundDirective } from '../../../directives/dark-mode-background.directive';

@Component({
  selector: 'app-admin-unlock',
  imports: [CommonModule, FormsModule, DarkModeBackgroundDirective],
  templateUrl: './admin-unlock.component.html',
  styleUrl: './admin-unlock.component.css'
})
export class AdminUnlockComponent {

  email: string | undefined;
  password: string | undefined;

  constructor(
    private router: Router, 
    private authService: AuthService
  ){}

  onSubmit() : void {
      if (this.email && this.password) {
      this.authService.signIn(this.email!, this.password!).subscribe((data: any) => {
        console.log(data);

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        this.authService.createUser(data.email, data.localId, data.idToken, expirationDate);
        localStorage.setItem('user', JSON.stringify(this.authService.user));

        console.log(this.authService.user);

        alert("Operazione effettuata con successo");
        this.router.navigateByUrl("user/dashboard");
      }, error => {
        alert("Login failed. Please check your credentials.");
      });
      } else {
        alert("Email/Password are required");
      }
  }

}
