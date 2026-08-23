import type { Preview } from '@storybook/angular-vite';
import { applicationConfig, componentWrapperDecorator } from '@storybook/angular-vite';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPortfolioPreset = definePreset(Aura);

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserModule),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: CustomPortfolioPreset,
            options: {
              darkModeSelector: '.studio-preview-canvas.p-dark',
              cssLayer: false
            }
          }
        })
      ],
    }),
    componentWrapperDecorator((story) => `
      <div class="studio-preview-canvas" style="padding: 3rem; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--p-content-background, #ffffff); transition: background-color 0.2s ease;">
        ${story}
      </div>
    `),
  ],
};

export default preview;
