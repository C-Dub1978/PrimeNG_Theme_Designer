import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { disabled, form, FormField } from '@angular/forms/signals';
import { StudioStateService } from '../../core/services/studio-state.service';
import { StudioStateSchema } from '../../core/models/theme-designer.model';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { Stepper, StepperModule } from 'primeng/stepper';
import { DecimalPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { LabelModule } from 'primeng/label';
import { ToolbarService } from '../../core/services/toolbar.service';

/**
 * Data shape backing the Setup step's Signal Form.
 */
interface SetupFormData {
  themeName: string;
  presetBase: ('Aura' | 'Lara' | 'Nora' | 'Material') | null;
  enableDarkTheme: boolean;
}

@Component({
  selector: 'td-setup',
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
  providers: [
    MessageService
  ],
  imports: [
    FileUploadModule,
    SelectModule,
    ToggleButtonModule,
    StepperModule,
    InputTextModule,
    ButtonModule,
    Stepper,
    DecimalPipe,
    FormField,
    ReactiveFormsModule,
    CheckboxModule,
    LabelModule
  ]
})
export class Setup {
  private router = inject(Router);
  private toastService = inject(MessageService);
  private studioStateService = inject(StudioStateService);
  private toolbarService = inject(ToolbarService);

  // ─── Stepper State ───────────────────────────────────────────────────
  activeStep = signal({ value: 1 });

  // ─── File Upload State ───────────────────────────────────────────────
  uploadedFile = signal<File | null>(null);
  isFileUploaded = signal(false);

  // ─── Preset Dropdown Options ─────────────────────────────────────────
  presetOptions = [
    { label: 'Aura', category: 'PrimeOne Design', value: 'Aura' },
    { label: 'Lara', category: 'PrimeOne Design', value: 'Lara' },
    { label: 'Nora', category: 'PrimeOne Design', value: 'Nora' },
    { label: 'Material', category: 'Material Design', value: 'Material' }
  ];

  // ─── Setup Form Data Model (Angular 22 Signal Forms) ──────────────────
  setupModel = signal<SetupFormData>({
    themeName: '',
    presetBase: null,
    enableDarkTheme: false
  });

  // Generate the interactive field tree, wiring mutual-exclusion logic between
  // the imported-file flow and the manual preset selection flow.
  setupForm = form(this.setupModel, (path) => {
    disabled(path.presetBase, { when: () => this.isFileUploaded() });
  });

  // ─── Mutual Exclusion: Manual Preset Selection ────────────────────────
  // True only when the user has directly interacted with the preset dropdown
  // (its field becomes dirty on UI interaction, never on a programmatic
  // setupModel.set() patch from an imported file).
  isPresetManuallySelected = computed(() => this.setupForm.presetBase().dirty());

  handleDarkModeChange(event: CheckboxChangeEvent): void {
    const value = event.checked;
    this.toolbarService.setSchemaHasDarkMode(!!value);
  }

  // ─── File Selected Handler ───────────────────────────────────────────
  onFileSelected(event: FileSelectEvent): void {
    const files = event.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0] as File;

    // Read file content and validate with Zod schema
    const reader = new FileReader();

    reader.onload = (): void => {
      try {
        const content = reader.result as string;
        const parsed = JSON.parse(content);

        // Validate against StudioStateSchema
        const validationResult = StudioStateSchema.safeParse(parsed);

        if (validationResult.success) {
          const validData = validationResult.data;

          // Extract original configuration and patch into the setup model
          const setupConfig = validData.setupConfig;

          this.setupModel.set({
            themeName: setupConfig.name,
            presetBase: setupConfig.preset,
            enableDarkTheme: setupConfig.hasDarkTheme
          });

          // Lock the preset dropdown (file took precedence)
          this.isFileUploaded.set(true);

          // Store the uploaded file reference
          this.uploadedFile.set(file);

          this.toastService.add({
            severity: 'success',
            summary: 'Theme Imported',
            detail: `Successfully loaded theme: ${setupConfig.name}`,
            life: 3000
          });
        } else {
          // Zod validation failed — clear file input and alert user
          this.uploadedFile.set(null);
          this.isFileUploaded.set(false);

          const errorMessage = validationResult.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('; ');

          this.toastService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: `Invalid theme file: ${errorMessage}`,
            life: 5000
          });
        }
      } catch {
        // JSON.parse failed — clear file input and alert user
        this.uploadedFile.set(null);
        this.isFileUploaded.set(false);

        this.toastService.add({
          severity: 'error',
          summary: 'Parse Error',
          detail: 'The selected file is not valid JSON. Please choose a valid theme configuration file.',
          life: 5000
        });
      }
    };

    reader.onerror = (): void => {
      this.uploadedFile.set(null);
      this.isFileUploaded.set(false);

      this.toastService.add({
        severity: 'error',
        summary: 'Read Error',
        detail: 'Failed to read the selected file. Please try again.',
        life: 5000
      });
    };

    reader.readAsText(file);
  }

  isFormInvalid(): boolean {
    const values = this.setupModel();
    return !values.themeName.trim() || !values.presetBase;
  }

  // ─── File Removed Handler ────────────────────────────────────────────
  onFileRemoved(): void {
    this.removeFile();
  }

  // ─── Remove File Handler ─────────────────────────────────────────────
  removeFile(): void {
    this.uploadedFile.set(null);
    this.isFileUploaded.set(false);

    // Clear form values that were populated from the file import
    this.setupModel.set({
      themeName: '',
      presetBase: null,
      enableDarkTheme: false
    });
  }

  // ─── Submission Handler: START DESIGNING! ────────────────────────────
  onStartDesigning(): void {
    // Generate a unique identity for the new studio session
    const uniqueId = crypto.randomUUID();

    const { themeName, presetBase, enableDarkTheme } = this.setupModel();

    // Invoke the injected StudioStateService to map and persist the layout
    this.studioStateService.initializeNewTheme({
        name: themeName,
        preset: presetBase!,
        hasDarkTheme: enableDarkTheme,  // Satisfies the hasDarkTheme contract
        isDarkMode: enableDarkTheme    // Satisfies the isDarkMode contract
      });

    // Navigate to the studio with the generated unique ID
    this.router.navigate(['/studio', uniqueId]);
  }
}