import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StudioStateService } from '../../core/services/studio-state.service';

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
  imports: [RouterOutlet]
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
}