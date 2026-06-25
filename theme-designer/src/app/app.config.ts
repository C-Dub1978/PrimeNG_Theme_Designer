import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPortfolioPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#fcf8ff',     // Light Background Base
                    50: '#f4eefa',
                    100: '#ebdffa',
                    200: '#dbbefa',
                    300: '#cb9dfa',
                    400: '#bb7cfa',
                    500: '#aa5cfa',
                    600: '#9441e3',
                    700: '#752ab8',
                    800: '#55198a',
                    900: '#340a57',
                    950: '#0d1106'     // Light Text Base
                },
                primary: {
                    color: '#58f802',  // Light Primary Neon
                    contrastColor: '#0d1106',
                    hoverColor: '#4ee202',
                    activeColor: '#44c802'
                },
                text: {
                    color: '#0d1106'
                }
            },
            dark: {
                surface: {
                    0: '#020700',     // Deep Obsidian Dark Background
                    50: '#041202',    // Deep Forest Used for Component Cards/Toolbars
                    100: '#082104',   // Distinct subtle borders
                    200: '#0d3308',
                    300: '#144c0d',
                    400: '#1d6614',
                    500: '#28851c',
                    600: '#35a626',
                    700: '#4bcc3a',
                    800: '#6df25c',
                    900: '#9bf78f',
                    950: '#f4f8ec'     // Dark Mode Crisp Cream Text
                },
                primary: {
                    color: '#5dfd08',  // Dark Primary Neon
                    contrastColor: '#020700',
                    hoverColor: '#53e207',
                    activeColor: '#49c806'
                },
                text: {
                    color: '#f4f8ec'
                }
            }
        }
    }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    providePrimeNG({
        theme: {
            preset: CustomPortfolioPreset,
            options: {
                darkModeSelector: '.p-dark', // Links cleanly to our visual header switch
                cssLayer: false
            }
        }
    })
  ]
};