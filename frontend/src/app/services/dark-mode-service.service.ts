import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkModeOn = false;
  private darkModeSubject = new BehaviorSubject<boolean>(this.darkModeOn); // BehaviorSubject to emit changes

  constructor() { 
    const storedDarkMode = localStorage.getItem('darkMode');
    this.darkModeOn = storedDarkMode === 'true';
    this.darkModeSubject.next(this.darkModeOn); // Emit initial dark mode state
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
    this.darkModeSubject.next(this.darkModeOn); // Emit change to subscribers
  }

  isDarkMode(): boolean{
    return this.darkModeOn;
  }

    // Provide an observable that emits dark mode state changes
  get darkMode$() {
    return this.darkModeSubject.asObservable();
  }
}
