import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../services/dark-mode-service.service';

@Directive({
  selector: '[appDarkModeBackground]'
})
export class DarkModeBackgroundDirective {

  @Input('appDarkModeBackground') modeType:
    | 'navbar-footer'
    | 'nav-links'
    | 'body'
    | 'dropdown'
    | 'default' = 'default';

  private darkModeSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    // Subscribe to dark mode status from the DarkModeService
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe(
      (isDarkMode) => this.applyStyles(isDarkMode)
    );

    // Also apply the class on initialization
    this.applyStyles(this.darkModeService.isDarkMode());
  }

  ngOnDestroy(): void {
    // Unsubscribe when the directive is destroyed
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

    private applyStyles(isDark: boolean): void {
    // First, clear old styles/classes
    this.clearClasses();

    switch (this.modeType) {
      case 'navbar-footer':
        this.toggleClasses(isDark, 'bg-dark', 'bg-light');
        this.toggleClasses(isDark, 'text-light', 'text-dark');
        break;
      case 'nav-links':
        this.toggleClasses(isDark, 'text-light', 'text-dark');
        break;
      case 'body':
        this.toggleClasses(isDark, 'bg-black', 'bg-white');
        this.toggleClasses(isDark, 'text-light', 'text-dark');
        break;
      case 'dropdown':
        this.toggleClasses(isDark, 'bg-secondary-subtle', 'bg-secondary.bg-gradient');
        this.toggleClasses(isDark, 'text-light', 'text-dark');
        break;
      default:
        this.toggleClasses(isDark, 'bg-dark', 'bg-light');
        this.toggleClasses(isDark, 'text-light', 'text-dark');
    }
  }

    private toggleClasses(
      isDark: boolean, darkClass: string, lightClass: string) {
    if (isDark) {
      this.renderer.addClass(this.el.nativeElement, darkClass);
      this.renderer.removeClass(this.el.nativeElement, lightClass);
    } else {
      this.renderer.addClass(this.el.nativeElement, lightClass);
      this.renderer.removeClass(this.el.nativeElement, darkClass);
    }
  }

  private setStyle(isDark: boolean, styles: { [key: string]: string }) {
    for (const [key, value] of Object.entries(styles)) {
      this.renderer.setStyle(this.el.nativeElement, key, value);
    }
  }

  private clearClasses() {
    const allDarkClasses = [
      'navbar-dark',
      'navbar-light',
      'footer-dark',
      'footer-light',
      'bg-dark',
      'bg-light',
      'text-dark',
      'text-light'
    ];
    allDarkClasses.forEach((cls) =>
      this.renderer.removeClass(this.el.nativeElement, cls)
    );
  }

}
