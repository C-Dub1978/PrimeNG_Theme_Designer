import { z } from 'zod';

/**
 * Zod schema for the nested config object within StudioState.
 * Validates: id (string), name (string), preset (enum), hasDarkTheme (boolean).
 */
export const StudioConfigSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Config name is required'),
  preset: z.enum(['Aura', 'Lara', 'Nora', 'Material']),
  hasDarkTheme: z.boolean(),
});

/**
 * Zod schema for a single custom token object within StudioState.
 * Validates: id (string), name (string), type (enum), value (unknown).
 */
export const CustomTokenSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Token name is required'),
  type: z.enum(['Text', 'Color', 'Number', 'Condition']),
  value: z.unknown(),
});

/**
 * Zod schema for StudioState validation.
 * Strictly validates an object matching the StudioState interface:
 * - config: nested object with id, name, preset, hasDarkTheme
 * - customTokens: array of token objects with id, name, type, value
 * - primitiveOverrides: empty record map (string keys, unknown values, default {})
 * - semanticOverrides: empty record map (string keys, unknown values, default {})
 */
export const StudioStateSchema = z.object({
  config: StudioConfigSchema,
  customTokens: z.array(CustomTokenSchema),
  primitiveOverrides: z.record(z.string(), z.unknown()).default({}),
  semanticOverrides: z.record(z.string(), z.unknown()).default({}),
});

/**
 * Type inference from Zod schema for compile-time type safety.
 */
export type ParsedStudioState = z.infer<typeof StudioStateSchema>;
export type ParsedStudioConfig = z.infer<typeof StudioConfigSchema>;
export type ParsedCustomToken = z.infer<typeof CustomTokenSchema>;