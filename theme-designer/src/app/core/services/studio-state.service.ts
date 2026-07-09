import { Injectable, signal } from '@angular/core';

import {
  StudioState,
  ThemeFileExport,
  ThemeFileImport,
  ThemeSetupConfig,
} from '../models/theme-designer.model';

/**
 * Service for persisting active theme design state across route changes.
 * Maintains a single writable signal representing the current studio session.
 */
@Injectable({
  providedIn: 'root',
})
export class StudioStateService {
  /**
   * Core writable signal holding the active studio state, or null if no session is active.
   */
  activeState = signal<StudioState | null>(null);

  /**
   * Initializes a new theme session with the provided configuration.
   * Generates a unique ID using native browser crypto.randomUUID(),
   * then updates activeState with the full StudioState structure.
   *
   * @param config - Theme setup configuration excluding the id field.
   */
  initializeNewTheme(config: Omit<ThemeSetupConfig, 'id'>): void {
    const uniqueId = crypto.randomUUID();

    this.activeState.set({
      setupConfig: { ...config, id: uniqueId },
      customTokenRows: [],
      primitivePlaceholders: {},
      semanticOverrideMap: {},
    });
  }
}
