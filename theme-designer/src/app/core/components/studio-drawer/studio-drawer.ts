import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { ToolbarService } from '../../services/toolbar.service';

interface NavigationTab {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'td-studio-drawer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonModule, TabsModule],
  templateUrl: './studio-drawer.html',
  styleUrl: './studio-drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudioDrawer {
  private toolbarService = inject(ToolbarService);

  // Unified global layout states connected cleanly via computed signals
  isExpanded = computed(() => this.toolbarService.isDrawerExpanded());
  isVisible = computed(() => this.toolbarService.isDrawerVisible());

  // Interactive local action button states
  isResetDropdownOpen = signal<boolean>(false);
  selectedPreset = signal<string | null>(null);
  isResetModalOpen = signal<boolean>(false);

  // Mandatory presets list array to loop over in the template
  presets: string[] = ['Aura', 'Lara', 'Nora', 'Material'];

  tabs: NavigationTab[] = [
    { label: 'Primitive', link: 'primitive', icon: 'pi pi-box' },
    { label: 'Semantic', link: 'semantic', icon: 'pi pi-percentage' },
    { label: 'Colors', link: 'colors', icon: 'pi pi-palette' },
    { label: 'Components', link: 'components', icon: 'pi pi-th-large' },
    { label: 'Custom Tokens', link: 'custom', icon: 'pi pi-sliders-h' },
    { label: 'Schema', link: 'schema', icon: 'pi pi-database' }
  ];

  toggleExpand(): void {
    this.toolbarService.toggleDrawerExpand();
  }

  closeDrawer(): void {
    this.toolbarService.isDrawerVisible.set(false);
  }

  toggleResetDropdown(): void {
    this.isResetDropdownOpen.update(v => !v);
  }

  selectPreset(preset: string): void {
    this.selectedPreset.set(preset);
    this.isResetDropdownOpen.set(false);
  }

  clearPreset(event: Event): void {
    event.stopPropagation(); // Avoid triggering the main button action frame
    this.selectedPreset.set(null);
    this.isResetDropdownOpen.set(false);
  }

  handleResetMainClick(): void {
    if (this.selectedPreset()) {
      this.isResetModalOpen.set(true);
    } else {
      this.toggleResetDropdown();
    }
  }

  closeResetModal(): void {
    this.isResetModalOpen.set(false);
  }

  executeResetConfirmation(): void {
    // Pipeline restore hook placeholder
    this.isResetModalOpen.set(false);
    this.selectedPreset.set(null);
  }

  updateSchema(): void {
    // Target schema change detection update function
  }

  exportSchema(): void {
    // Automated schema object compilation web download file assembly
  }
}
