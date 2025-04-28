import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private darkModeService: DarkModeService) {}

  toggleDark(){
    this.darkModeService.toggleDarkMode();
  }

  isDarkMode(){
    return this.darkModeService.isDarkMode();
  }

}
