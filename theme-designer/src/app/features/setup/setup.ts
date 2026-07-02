import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StudioStateService } from '../../core/services/studio-state.service';
import { StudioStateSchema } from '../../core/schemas/studio-state.schema';
import { MessageService } from 'primeng/api';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { Stepper, StepperModule } from 'primeng/stepper';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'td-setup',
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
  providers: [
    MessageService
  ],
  imports: [
    Stepper,
    FileUploadModule,
    StepperModule,
    DecimalPipe
})
export class SetupComponent {
  private router = inject(Router);
  private toastService = inject(MessageService);
  private studioStateService = inject(StudioStateService);

  // ─── Stepper State ───────────────────────────────────────────────────
  activeStep = signal({ value: 1 });

  // ─── File Upload State ───────────────────────────────────────────────
  uploadedFile = signal<File | null>(null);
  step1HasFileUploaded = signal(false);

  // ─── Preset / Mutual Exclusion State ─────────────────────────────────
  step2HasPresetSelected = signal(false);
  isPresetLocked = signal(false);

  // ─── Preset Dropdown Options ─────────────────────────────────────────
  presetOptions = [
    { label: 'Aura', category: 'PrimeOne Design' },
    { label: 'Lara', category: 'PrimeOne Design' },
    { label: 'Nora', category: 'PrimeOne Design' },
    { label: 'Material', category: 'Material Design' }
  ];

  // ─── Signal Form (Angular 22 Signal Forms exclusively) ───────────────
  setupForm = formGroup({
    themeName: formControl(''),
    presetBase: formControl(''),
    enableDarkTheme: formControl(false)
  });

  // ─── Constructor: Effect to sync step2HasPresetSelected with form ────
  constructor() {
    // Track presetBase form control changes to unlock file upload
    effect(() => {
      const selectedPreset = this.setupForm.get('presetBase')?.value;
      const wasLocked = this.isPresetLocked();
      const hasPreset = !!selectedPreset;

      // If user manually selected a preset (form was touched and has value)
      if (hasPreset && !wasLocked) {
        this.step2HasPresetSelected.set(true);
        this.isPresetLocked.set(true);
      }

      // If preset was cleared, unlock both UI elements
      if (!hasPreset) {
        this.step2HasPresetSelected.set(false);
        this.isPresetLocked.set(false);
      }
    });
  }

  // ─── File Selected Handler ───────────────────────────────────────────
  onFileSelected(event: FileUploadHandlerEvent): void {
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

          // Extract original configuration and patch form signals
          const setupConfig = validData.setupConfig;

          // Patch the theme name from imported config
          this.setupForm.get('themeName')?.set(setupConfig.name);

          // Patch the preset base from imported config
          this.setupForm.get('presetBase')?.set(setupConfig.preset);

          // Patch the dark theme flag from imported config
          this.setupForm.get('enableDarkTheme')?.set(setupConfig.hasDarkTheme);

          // Lock the preset dropdown (file took precedence)
          this.isPresetLocked.set(true);
          this.step2HasPresetSelected.set(true);
          this.step1HasFileUploaded.set(true);

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
          this.step1HasFileUploaded.set(false);

          const errorMessage = validationResult.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join('; ');

          this.toastService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: `Invalid theme file: ${errorMessage}`,
            life: 5000
          });
        }
      } catch (parseError) {
        // JSON.parse failed — clear file input and alert user
        this.uploadedFile.set(null);
        this.step1HasFileUploaded.set(false);

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
      this.step1HasFileUploaded.set(false);

      this.toastService.add({
        severity: 'error',
        summary: 'Read Error',
        detail: 'Failed to read the selected file. Please try again.',
        life: 5000
      });
    };

    reader.readAsText(file);
  }

  // ─── File Removed Handler ────────────────────────────────────────────
  onFileRemoved(): void {
    this.removeFile();
  }

  // ─── Remove File Handler ─────────────────────────────────────────────
  removeFile(): void {
    this.uploadedFile.set(null);
    this.step1HasFileUploaded.set(false);

    // Unlock preset dropdown when file is removed
    this.isPresetLocked.set(false);
    this.step2HasPresetSelected.set(false);

    // Clear form values that were populated from file import
    this.setupForm.get('themeName')?.reset();
    this.setupForm.get('presetBase')?.reset();
    this.setupForm.get('enableDarkTheme')?.reset(false);
  }

  // ─── Submission Handler: START DESIGNING! ────────────────────────────
  onStartDesigning(): void {
    // Generate a unique identity
    const uniqueId = crypto.randomUUID();

    // Get form values
    const themeName = this.setupForm.get('themeName')?.value ?? '';
    const presetBase = this.setupForm.get('presetBase')?.value ?? '';
    const enableDarkTheme = this.setupForm.get('enableDarkTheme')?.value ?? false;

    // Build the StudioStateService payload
    const statePayload = {
      setupConfig: {
        id: uniqueId,
        name: themeName,
        preset: presetBase as 'Aura' | 'Lara' | 'Nora' | 'Material',
        hasDarkTheme: enableDarkTheme
      },
      customTokenRows: [],
      primitivePlaceholders: {},
      semanticOverrideMap: {}
    };

    // Initialize the state service with the payload
    this.studioStateService.initializeState(statePayload);

    // Navigate to the studio with the unique ID
    this.router.navigate(['/studio', uniqueId]);
  }
}