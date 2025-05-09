import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DarkModeBackgroundDirective } from '../../directives/dark-mode-background.directive';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, DarkModeBackgroundDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();

  constructor() {}

}
