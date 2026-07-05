import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StudioStateService } from '../../core/services/studio-state.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

/**
 * Studio - Main theme design studio controller.
 * 
 * This component provides the main workspace for theme creation and editing.
 * It maintains the active StudioState and provides the shell for all design tools.
 */
@Component({
  selector: 'td-studio',
  templateUrl: './studio.html',
  styleUrl: './studio.scss',
  imports: [RouterOutlet, ToggleButtonModule, FormsModule]
})
export class Studio {
  private router = inject(Router);
  private studioStateService = inject(StudioStateService);

  /**
   * The unique ID of the current studio session.
   * Extracted from the route parameters.
   */
  sessionId = input<string>('');

  /**
   * Read-only computed signal for the active StudioState.
   * Returns null if no session is active or state is uninitialized.
   */
  activeState = computed(() => this.studioStateService.activeState());

  /**
   * Current dark mode state (true = dark theme active).
   * Bound to the PrimeNG toggleButton component.
   */
  isDarkMode = computed(() => this.studioStateService.activeState()?.setupConfig?.isDarkMode ?? false);

  /**
   * Whether the dark theme is disabled (true = toggle is disabled).
   * Bound to the PrimeNG toggleButton disabled attribute.
   */
  isDarkThemeDisabled = signal<boolean>(
    !this.studioStateService.activeState()?.setupConfig?.isDarkMode
  );
}
