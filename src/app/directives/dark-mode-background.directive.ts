import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../services/dark-mode-service.service';

@Directive({
  selector: '[appDarkModeBackground]'
})
export class DarkModeBackgroundDirective {

  private darkModeSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    // Subscribe to dark mode status from the DarkModeService
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((isDarkMode: boolean) => {
      this.updateBackgroundClass(isDarkMode);
    });

    // Also apply the class on initialization
    this.updateBackgroundClass(this.darkModeService.isDarkMode());
  }

  ngOnDestroy(): void {
    // Unsubscribe when the directive is destroyed
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  private updateBackgroundClass(isDarkMode: boolean) {
    if (isDarkMode) {
      this.renderer.addClass(this.el.nativeElement, 'bg-dark');  // Dark mode class
      this.renderer.removeClass(this.el.nativeElement, 'bg-body-secondary');  // Remove light mode class
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bg-body-secondary');  // Light mode class
      this.renderer.removeClass(this.el.nativeElement, 'bg-dark');  // Remove dark mode class
    }
  }

}
