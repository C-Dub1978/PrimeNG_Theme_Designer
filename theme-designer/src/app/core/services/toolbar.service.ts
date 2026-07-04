import { computed, effect, Service, Signal, signal, WritableSignal } from '@angular/core';

@Service()
export class ToolbarService {
    // These 2 variables tie directly to wether or not the user has chosen to add a dark mode to their theme
    private _enableDarkMode: WritableSignal<boolean> = signal(false);
    public schemaHasDarkMode: Signal<boolean> = this._enableDarkMode.asReadonly();

    // This is the toggle button to actually switch between light and dark mode, IF they actually have dark mode
    private _darkModeActivated: WritableSignal<boolean> = signal(false);
    public darkModeActivated = computed(() => {
        const darkModeEnabled = this._enableDarkMode();
        if (!darkModeEnabled) return false;
        const isDarkModeSet = this._darkModeActivated();
        return !!isDarkModeSet;
    });

    constructor() {
        // Set up a computed signal to handle dark/light mode toggle
        effect(() => {
            const hasDarkModeInTheme = this.schemaHasDarkMode();
            if (!hasDarkModeInTheme) return;
            const darkModeActive = this.darkModeActivated();
            const documentElement = document.documentElement;
            if (!!darkModeActive) {
                documentElement.classList.add('p-dark');
            } else {
                documentElement.classList.remove('p-dark');
            }
        });
       }

    setSchemaHasDarkMode(hasDarkMode: boolean): void {
        this._enableDarkMode.set(hasDarkMode);
        // Force light mode if they make a change to wether or not they have dark mode in their theme schema
        this._darkModeActivated.set(false);
    }

    toggleDarkModeActivated(): void {
        this._darkModeActivated.update((isDarkMode: boolean) => !isDarkMode);
    }
}
