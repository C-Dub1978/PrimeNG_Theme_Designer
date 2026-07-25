import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToolbarService } from '../../core/services/toolbar.service';

@Component({
  selector: 'td-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Setup {
  private router = inject(Router);
  private toolbarService = inject(ToolbarService);

  // Active step navigation signal trackers
  activeStep = signal<number>(1);
  isUploadMode = signal<boolean>(false);

  // Stable Signal Forms values matching coding laws
  themeName = signal<string>('');
  basePreset = signal<string>('aura');
  addDarkMode = signal<boolean>(false);

  presets: string[] = ['Aura', 'Lara', 'Nora', 'Material'];

  // Clean validation rule mapped directly as a computed state
  isFormInvalid = computed(() => {
    const name = this.themeName().trim();
    if (!name) return true;
    
    // RegEx validation for safe identifier naming conventions
    const namePattern = /^[a-zA-Z0-9_-]+$/;
    return !namePattern.test(name);
  });

  setUploadMode(upload: boolean): void {
    this.isUploadMode.set(upload);
    if (upload) {
      this.activeStep.set(3);
    } else {
      this.activeStep.set(2);
    }
  }

  goNext(): void {
    if (this.activeStep() === 2 && this.isFormInvalid()) {
      return;
    }
    this.activeStep.update(step => step + 1);
  }

  goBack(): void {
    if (this.activeStep() === 3 && this.isUploadMode()) {
      this.activeStep.set(1);
    } else {
      this.activeStep.update(step => step - 1);
    }
  }

  submitSetup(): void {
    if (this.activeStep() === 3 && (this.isUploadMode() || !this.isFormInvalid())) {
      // Synchronize state with our unified shared service
      this.toolbarService.setSchemaHasDarkMode(this.addDarkMode());
      
      // Generate a session design ID string parameter allocation
      const randomDesignID = 'ds_' + Math.random().toString(36).substring(2, 11);
      
      // Route over into the Studio Shell playground
      this.router.navigate(['/studio', randomDesignID]);
    }
  }
}
