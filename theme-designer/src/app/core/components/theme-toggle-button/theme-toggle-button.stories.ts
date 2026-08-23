import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { applicationConfig } from '@storybook/angular-vite';
import { importProvidersFrom } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ToolbarService } from '../../services/toolbar.service';
import { ThemeToggleButton } from './theme-toggle-button';

class MockToolbarService {
  darkModeActivated = signal(false);
  
  isDarkSupported() {
    return true;
  }
  
  toggleDarkModeActivated() {
    this.darkModeActivated.update(current => {
      const nextState = !current;
      const container = document.querySelector('.studio-preview-canvas') as HTMLElement;
      
      if (container) {
        if (nextState) {
          container.classList.add('p-dark');
          // Directly forcing the dark color palette value onto the canvas backdrop style
          container.style.backgroundColor = '#090d16';
        } else {
          container.classList.remove('p-dark');
          // Restoring the clean light mode off-white background color palette value
          container.style.backgroundColor = '#f8fafc';
        }
      }
      return nextState;
    });
  }
}

const meta: Meta<ThemeToggleButton> = {
  title: 'Design System/Widgets/Theme Toggle Button',
  component: ThemeToggleButton,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(FormsModule, ToggleSwitchModule),
        { provide: ToolbarService, useClass: MockToolbarService }
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ThemeToggleButton>;

export const DefaultLightMode: Story = {
  args: {},
};

export const InitialDarkMode: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: ToolbarService,
          useFactory: () => {
            const mock = new MockToolbarService();
            mock.darkModeActivated.set(true);
            
            // Synchronously forces the canvas to render in dark state during boot
            setTimeout(() => {
              const container = document.querySelector('.studio-preview-canvas') as HTMLElement;
              if (container) {
                container.classList.add('p-dark');
                container.style.backgroundColor = '#090d16';
              }
            }, 0);
            
            return mock;
          }
        }
      ]
    })
  ],
  args: {},
};
