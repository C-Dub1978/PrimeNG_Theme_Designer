import type { StorybookConfig } from '@storybook/angular-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.stories.ts'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: { name: '@storybook/angular-vite', options: {} },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tsconfigPaths({ projects: ['tsconfig.app.json'] })],
    });
  },
};
export default config;