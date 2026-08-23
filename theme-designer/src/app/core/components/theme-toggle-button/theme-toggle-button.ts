import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';
import { ToolbarService } from '../../services/toolbar.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'td-theme-toggle-button',
  standalone: true,
  imports: [FormsModule, ToggleSwitchModule],
  templateUrl: './theme-toggle-button.html',
  styleUrl: './theme-toggle-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleButton {
  private toolbarService = inject(ToolbarService);

    customSwitchTokens = signal<Record<string, string>>({
        background: '#e0e0e0',
        checkedBackground: '#4caf50'
    });

  // Map shared service states to local read-only properties via computed signals
  isDarkMode = computed(() => this.toolbarService.darkModeActivated());
  
  // Safe fallbacks to prevent errors if these properties aren't fully initialized on the service yet
  isDarkSupported = computed(() => {
    if (typeof this.toolbarService.isDarkSupported === 'function') {
      return this.toolbarService.isDarkSupported();
    }
    // If it's a raw signal property on the service:
    const serviceProp = (this.toolbarService as any).isDarkSupported;
    return typeof serviceProp === 'function' ? serviceProp() : true;
  });

  toggleTheme(): void {
    if (!this.isDarkSupported()) {
      return;
    }
    
    if (typeof this.toolbarService.toggleDarkModeActivated === 'function') {
      this.toolbarService.toggleDarkModeActivated();
    } else {
      // Fallback implementation if the service expects direct signal modification
      const serviceSignal = (this.toolbarService as any).darkModeActivated;
      if (typeof serviceSignal?.update === 'function') {
        serviceSignal.update((current: boolean) => !current);
      }
    }
  }
}
