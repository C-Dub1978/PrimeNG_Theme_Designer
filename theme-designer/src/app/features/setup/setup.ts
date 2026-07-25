import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { disabled, form, FormField } from '@angular/forms/signals';
import { StudioStateService } from '../../core/services/studio-state.service';
import { StudioStateSchema } from '../../core/models/theme-designer.model';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { DecimalPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { LabelModule } from 'primeng/label';
import { ToolbarService } from '../../core/services/toolbar.service';
import { ImportExport, SetupFormData } from '@core/services/import-export';

@Component({
  selector: 'td-setup',
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
  providers: [MessageService],
  imports: [
    FileUploadModule,
    SelectModule,
    StepperModule,
    InputTextModule,
    ButtonModule,
    DecimalPipe,
    FormField,
    ReactiveFormsModule,
    CheckboxModule,
    LabelModule,
  ],
})
export class Setup {
  private router = inject(Router);
  private importExportSerice = inject(ImportExport);
  private studioStateService = inject(StudioStateService);
  private toolbarService = inject(ToolbarService);

  // ─── Stepper State ───────────────────────────────────────────────────
  activeStep = signal({ value: 1 });

  // ─── Preset Dropdown Options ─────────────────────────────────────────
  presetOptions = [
    { label: 'Aura', category: 'PrimeOne Design', value: 'Aura' },
    { label: 'Lara', category: 'PrimeOne Design', value: 'Lara' },
    { label: 'Nora', category: 'PrimeOne Design', value: 'Nora' },
    { label: 'Material', category: 'Material Design', value: 'Material' },
  ];

  // ─── Setup Form Data Model (Angular 22 Signal Forms) ──────────────────
  setupModel = signal<SetupFormData>({
    themeName: '',
    presetBase: null,
    enableDarkTheme: false,
  });

  // Generate the interactive field tree, wiring mutual-exclusion logic between
  // the imported-file flow and the manual preset selection flow.
  setupForm = form(this.setupModel, (path) => {
    disabled(path.presetBase, { when: () => this.importExportSerice.isFileUploaded() });
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
  isFormInvalid(): boolean {
    const values = this.setupModel();
    return !values.themeName.trim() || !values.presetBase;
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
      hasDarkTheme: enableDarkTheme, // Satisfies the hasDarkTheme contract
      isDarkMode: enableDarkTheme, // Satisfies the isDarkMode contract
    });

    // Navigate to the studio with the generated unique ID
    this.router.navigate(['/studio', uniqueId]);
  }
}
