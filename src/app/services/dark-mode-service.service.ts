import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkModeOn = false;

  constructor() { 
    const storedDarkMode = localStorage.getItem('darkMode');
    this.darkModeOn = storedDarkMode === 'true';
    if (this.darkModeOn) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode(){
    this.darkModeOn = !this.darkModeOn;
    if(this.darkModeOn){
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else{
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

  isDarkMode(): boolean{
    return this.darkModeOn;
  }
}
