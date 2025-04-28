import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode-service.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();

  constructor(private darkModeService: DarkModeService) {}

  isDarkMode(){
    return this.darkModeService.isDarkMode();
  }
}
