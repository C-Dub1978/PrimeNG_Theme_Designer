import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolbarService } from './core/services/toolbar.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'td-root',
  imports: [ButtonModule, RouterOutlet, ToolbarModule, ToggleSwitchModule],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root {
  toolbarService = inject(ToolbarService);
  protected readonly title = signal('PrimeNG Theme Designer');
  // This is what determines whether or not the button is enabled or disabled, and nothing to do with actually switching between light/dark
  //    The only way that we enable the toggle button is if they explicitly choose to add a dark mode property to their schema.
  schemaHasDarkMode = this.toolbarService.schemaHasDarkMode;
  // This is the acutal value of wether or not it is light or dark mode currently.
   _darkModeActivated = this.toolbarService.darkModeActivated;
   public darkModeActive = this._darkModeActivated;

  menuItems() {
    const start: Array<{ label: string; icon: string; routerLink: string[] }> = [
      { label: 'Setup', icon: 'pi pi-home', routerLink: ['/setup'] },
    ];

    const end: Array<unknown> = [];

    return { start, end };
  }

  toggleDarkMode(): void {
    this.toolbarService.toggleDarkModeActivated();
  }
}
