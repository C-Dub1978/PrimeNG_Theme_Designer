import { computed, effect, Service, Signal, signal, WritableSignal } from '@angular/core';

@Service()
export class ToolbarService {
  // Drawer functionality
  isDrawerExpanded = signal(true);
  isDrawerVisible = signal(true);
  drawerCustomWidthPx = signal(0);
  
  isDrawerExpanded$ = computed(() => this.isDrawerExpanded());
  isDrawerVisible$ = computed(() => this.isDrawerVisible());
  drawerCustomWidthPx$ = computed(() => this.drawerCustomWidthPx());

  // These 2 variables tie directly to whether or not the user has chosen to add a dark mode to their theme
  private _enableDarkMode: WritableSignal<boolean> = signal(false);
  public schemaHasDarkMode: Signal<boolean> = this._enableDarkMode.asReadonly();
  
  // Public structural bridge mapping your state rule to your active components
  public isDarkSupported = computed(() => this.schemaHasDarkMode());

  // This is the toggle button to actually switch between light and dark mode, IF they actually have dark mode
  private _darkModeActivated: WritableSignal<boolean> = signal(false);
  public darkModeActivated = computed(() => {
    const darkModeEnabled = this._enableDarkMode();
    if (!darkModeEnabled) return false;
    const isDarkModeSet = this._darkModeActivated();
    return !!isDarkModeSet;
  });

  constructor() {
    // Set up a computed signal to handle dark/light mode toggle on the sandbox canvas ONLY
    effect(() => {
      const hasDarkModeInTheme = this.schemaHasDarkMode();
      if (!hasDarkModeInTheme) return;
      
      const darkModeActive = this.darkModeActivated();
      
      // Target our isolated preview canvas container by class instead of documentElement
      const sandboxElement = document.querySelector('.studio-preview-canvas');
      if (!sandboxElement) return;
      
      if (!!darkModeActive) {
        sandboxElement.classList.add('p-dark');
      } else {
        sandboxElement.classList.remove('p-dark');
      }
    });
  }

  setIsDrawerVisible(isVisible: boolean): void {
    this.isDrawerVisible.set(isVisible);
  }

  setSchemaHasDarkMode(hasDarkMode: boolean): void {
    this._enableDarkMode.set(hasDarkMode);
    // Force light mode if they make a change to whether or not they have dark mode in their theme schema
    this._darkModeActivated.set(false);
  }

  toggleDarkModeActivated(): void {
    this._darkModeActivated.update((isDarkMode: boolean) => !isDarkMode);
  }

  toggleDrawerExpand(): void {
    this.isDrawerExpanded.set(!this.isDrawerExpanded());
  }

  setCustomWidth(width: number): void {
    this.drawerCustomWidthPx.set(width);
  }
}
