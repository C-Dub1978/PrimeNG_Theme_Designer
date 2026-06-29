import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPortfolioPreset = definePreset(Aura);

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