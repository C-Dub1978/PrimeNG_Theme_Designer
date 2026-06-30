/**
 * Theme setup configuration interface.
 * Defines the core properties for a theme studio session.
 */
export interface ThemeSetupConfig {
  id: string;
  name: string;
  preset: 'Aura' | 'Lara' | 'Nora' | 'Material';
  hasDarkTheme: boolean;
}

/**
 * Custom token row interface.
 * Represents a single token definition in the custom token list.
 */
export interface CustomTokenRow {
  id: string;
  name: string;
  type: 'Text' | 'Color' | 'Number' | 'Condition';
  value: unknown;
}

/**
 * Studio state interface.
 * Combines all runtime state for the theme designer studio.
 */
export interface StudioState {
  setupConfig: ThemeSetupConfig;
  customTokenRows: CustomTokenRow[];
  primitivePlaceholders: Record<string, unknown>;
  semanticOverrideMap: Record<string, unknown>;
}
