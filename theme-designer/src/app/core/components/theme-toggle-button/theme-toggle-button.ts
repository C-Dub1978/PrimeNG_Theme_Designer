import { Component, computed, inject } from '@angular/core';
import { StudioStateService } from '../../services/studio-state.service';
import { ToolbarService } from '../../services/toolbar.service';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'td-theme-toggle-button',
  imports: [
    ToggleButtonModule
  ],
  templateUrl: './theme-toggle-button.html',
  styleUrl: './theme-toggle-button.scss',
})
export class ThemeToggleButton {
  private readonly _studioStateService = inject(StudioStateService);
  private readonly _toolbarService = inject(ToolbarService);

  get studioStateService(): StudioStateService {
    return this._studioStateService;
  }

  get toolbarService(): ToolbarService {
    return this._toolbarService;
  }

  readonly moonEmoji = '🌚';
  readonly sunEmoji = '🌞';

  isDarkSupported = computed(() => {
    const state = this._studioStateService.activeState();
    return state?.setupConfig?.hasDarkTheme ?? false;
  });

  toggleTheme(): void {
    if (this.isDarkSupported()) {
      this._toolbarService.toggleDarkModeActivated();
    }
  }
}