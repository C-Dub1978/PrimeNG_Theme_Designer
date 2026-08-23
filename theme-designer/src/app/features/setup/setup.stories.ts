import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { applicationConfig } from '@storybook/angular-vite';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LabelModule } from 'primeng/label';
import { StepperModule } from 'primeng/stepper';
import { DecimalPipe } from '@angular/common';
import { Setup } from './setup';
import { ImportExport } from '@core/services/import-export';
import { StudioStateService } from '@core/services/studio-state.service';
import { ToolbarService } from '@core/services/toolbar.service';

// Mock services
class MockImportExport {
  uploadedFile = signal<File | null>(null);
  onFileSelected = (_: FileSelectEvent) => {};
  onFileRemoved = () => {};
}

class MockStudioStateService {
  initializeNewTheme = (_: { name: string, preset: string, hasDarkTheme: boolean, isDarkMode: boolean }) => {};
}

class MockToolbarService {
  setSchemaHasDarkMode = (_: boolean) => {};
}

const meta: Meta<Setup> = {
  title: 'Features/Setup Wizard',
  component: Setup,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(
          ReactiveFormsModule,
          FileUploadModule,
          SelectModule,
          InputTextModule,
          ButtonModule,
          CheckboxModule,
          LabelModule,
          StepperModule,
          DecimalPipe
        ),
        { provide: ImportExport, useClass: MockImportExport },
        { provide: StudioStateService, useClass: MockStudioStateService },
        { provide: ToolbarService, useClass: MockToolbarService }
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Setup>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<td-setup></td-setup>`
  }),
  args: {},
};
