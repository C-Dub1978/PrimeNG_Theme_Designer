import { z } from 'zod';

/**
 * Theme setup configuration interface.
 * Defines the core properties for a theme studio session.
 */
export interface ThemeSetupConfig {
  id: string;
  name: string;
  preset: 'Aura' | 'Lara' | 'Nora' | 'Material';
  hasDarkTheme: boolean;
  isDarkMode: boolean;
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

export interface ThemeFileExport {
    primitive: any;
    semantic: any;
    components: any;
    extend: any;
}

export interface ThemeFileImport {}

/**
 * Zod schema for ThemeSetupConfig validation.
 * Validates core properties including preset options and dark mode flag.
 */
export const ThemeSetupConfigSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Theme name is required'),
  preset: z.enum(['Aura', 'Lara', 'Nora', 'Material']),
  hasDarkTheme: z.boolean(),
  isDarkMode: z.boolean(),
});

/**
 * Zod schema for CustomTokenRow validation.
 * Validates each custom token with id, name, type, and value constraints.
 */
export const CustomTokenRowSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Token name is required'),
  type: z.enum(['Text', 'Color', 'Number', 'Condition']),
  value: z.unknown(),
});

/**
 * Zod schema for StudioState validation.
 * Mirrors the StudioState interface for secure workspace save/load validation.
 * customTokenRows represents custom tokens as an array of objects with id, name, type, and value.
 */
export const StudioStateSchema = z.object({
  setupConfig: ThemeSetupConfigSchema,
  customTokenRows: z.array(CustomTokenRowSchema),
  primitivePlaceholders: z.record(z.string(), z.unknown()),
  semanticOverrideMap: z.record(z.string(), z.unknown()),
});

/**
 * Type inference from Zod schemas for compile-time type safety.
 */
export type ParsedStudioState = z.infer<typeof StudioStateSchema>;
export type ParsedThemeSetupConfig = z.infer<typeof ThemeSetupConfigSchema>;
export type ParsedCustomTokenRow = z.infer<typeof CustomTokenRowSchema>;