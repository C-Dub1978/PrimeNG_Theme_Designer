import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleButton } from './theme-toggle-button';

describe('ThemeToggleButton', () => {
  let component: ThemeToggleButton;
  let fixture: ComponentFixture<ThemeToggleButton>;
  let mockStudioStateService: any;
  let mockToolbarService: any;

  beforeEach(async () => {
    mockStudioStateService = {
      activeState: vi.fn()
    };

    mockToolbarService = {
      setSchemaHasDarkMode: vi.fn(),
      toggleDarkModeActivated: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ThemeToggleButton],
      providers: [
        { provide: 'StudioStateService', useValue: mockStudioStateService },
        { provide: 'ToolbarService', useValue: mockToolbarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleButton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with emoji properties', () => {
    expect(component.sunEmoji).toBe('🌞');
    expect(component.moonEmoji).toBe('🌚');
  });

  it('should correctly compute isDarkSupported as false when hasDarkTheme is false', () => {
    mockStudioStateService.activeState.mockReturnValue({
      setupConfig: {
        hasDarkTheme: false
      }
    });

    const result = component.isDarkSupported();
    expect(result).toBe(false);
  });

  it('should correctly compute isDarkSupported as true when hasDarkTheme is true', () => {
    mockStudioStateService.activeState.mockReturnValue({
      setupConfig: {
        hasDarkTheme: true
      }
    });

    const result = component.isDarkSupported();
    expect(result).toBe(true);
  });

  it('should not call toolbarService.toggleDarkModeActivated when dark mode is not supported', () => {
    mockStudioStateService.activeState.mockReturnValue({
      setupConfig: {
        hasDarkTheme: false
      }
    });

    component.toggleTheme();
    expect(mockToolbarService.toggleDarkModeActivated).not.toHaveBeenCalled();
  });

  it('should call toolbarService.toggleDarkModeActivated when dark mode is supported', () => {
    mockStudioStateService.activeState.mockReturnValue({
      setupConfig: {
        hasDarkTheme: true
      }
    });

    component.toggleTheme();
    expect(mockToolbarService.toggleDarkModeActivated).toHaveBeenCalled();
  });
});
