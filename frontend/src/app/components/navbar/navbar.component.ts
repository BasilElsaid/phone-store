import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode-service.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { DarkModeBackgroundDirective } from '../../directives/dark-mode-background.directive';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, DarkModeBackgroundDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthService
  ) {}

  toggleDark(){
    this.darkModeService.toggleDarkMode();
  }

  isDarkMode(){
    return this.darkModeService.isDarkMode();
  }

  checkAdminAccess() {
    return this.authService.checkAdmin();
  }

}
