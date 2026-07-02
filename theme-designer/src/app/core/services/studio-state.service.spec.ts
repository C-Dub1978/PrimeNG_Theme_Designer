import { describe, it, expect, beforeEach } from 'vitest';

import { StudioStateService } from './studio-state.service';

describe('StudioStateService', () => {
  let service: StudioStateService;

  beforeEach(() => {
    service = new StudioStateService();
  });

  describe('initial state', () => {
    it('should create the service successfully', () => {
      expect(service).toBeTruthy();
    });

    it('should have activeState signal defaulting to null', () => {
      const current = service.activeState();
      expect(current).toBeNull();
    });
  });

  describe('initializeNewTheme', () => {
    it('should set activeState when called with a full config', () => {
      service.initializeNewTheme({
        name: 'My Theme',
        preset: 'Aura',
        hasDarkTheme: false
      });

      const state = service.activeState();
      expect(state).not.toBeNull();
      expect(state?.setupConfig.name).toBe('My Theme');
      expect(state?.setupConfig.preset).toBe('Aura');
      expect(state?.setupConfig.hasDarkTheme).toBe(false);
    });

    it('should generate a valid UUID string for the setupConfig id', () => {
      service.initializeNewTheme({
        name: 'UUID Test Theme',
        preset: 'Lara',
        hasDarkTheme: true
      });

      const state = service.activeState();
      expect(state).not.toBeNull();

      const id = state?.setupConfig.id;
      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });

    it('should produce a different UUID on each call', () => {
      service.initializeNewTheme({
        name: 'First Theme',
        preset: 'Material',
        hasDarkTheme: false
      });

      const firstId = service.activeState()?.setupConfig.id;

      service.initializeNewTheme({
        name: 'Second Theme',
        preset: 'Nora',
        hasDarkTheme: true
      });

      const secondId = service.activeState()?.setupConfig.id;

      expect(firstId).not.toBe(secondId);
    });

    it('should persist customTokenRows as an empty array by default', () => {
      service.initializeNewTheme({
        name: 'Default Rows Theme',
        preset: 'Aura',
        hasDarkTheme: false
      });

      const state = service.activeState();
      expect(state?.customTokenRows).toEqual([]);
    });

    it('should persist primitivePlaceholders as an empty object by default', () => {
      service.initializeNewTheme({
        name: 'Default Placeholders Theme',
        preset: 'Lara',
        hasDarkTheme: true
      });

      const state = service.activeState();
      expect(state?.primitivePlaceholders).toEqual({});
    });

    it('should persist semanticOverrideMap as an empty object by default', () => {
      service.initializeNewTheme({
        name: 'Default Overrides Theme',
        preset: 'Nora',
        hasDarkTheme: false
      });

      const state = service.activeState();
      expect(state?.semanticOverrideMap).toEqual({});
    });

    it('should correctly store hasDarkTheme flag as true', () => {
      service.initializeNewTheme({
        name: 'Dark Theme',
        preset: 'Material',
        hasDarkTheme: true
      });

      const state = service.activeState();
      expect(state?.setupConfig.hasDarkTheme).toBe(true);
    });

    it('should correctly store hasDarkTheme flag as false', () => {
      service.initializeNewTheme({
        name: 'Light Theme',
        preset: 'Aura',
        hasDarkTheme: false
      });

      const state = service.activeState();
      expect(state?.setupConfig.hasDarkTheme).toBe(false);
    });

    it('should overwrite the previous activeState when called again', () => {
      service.initializeNewTheme({
        name: 'Old Theme',
        preset: 'Lara',
        hasDarkTheme: false
      });

      expect(service.activeState()?.setupConfig.name).toBe('Old Theme');

      service.initializeNewTheme({
        name: 'New Theme',
        preset: 'Nora',
        hasDarkTheme: true
      });

      expect(service.activeState()?.setupConfig.name).toBe('New Theme');
      expect(service.activeState()?.setupConfig.preset).toBe('Nora');
    });

    it('should produce a state that matches the StudioState type structure', () => {
      service.initializeNewTheme({
        name: 'Type Check Theme',
        preset: 'Material',
        hasDarkTheme: false
      });

      const state = service.activeState();

      expect(state).toMatchObject({
        setupConfig: {
          id: expect.any(String),
          name: expect.any(String),
          preset: expect.any(String),
          hasDarkTheme: expect.any(Boolean)
        },
        customTokenRows: expect.any(Array),
        primitivePlaceholders: expect.any(Object),
        semanticOverrideMap: expect.any(Object)
      });
    });
  });
});