import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChipModule } from 'primeng/chip';
import { StudioHeader } from '../../core/components/studio-header/studio-header';
import { StudioFooter } from '../../core/components/studio-footer/studio-footer';
import { StudioDrawer } from '../../core/components/studio-drawer/studio-drawer';
import { ToolbarService } from '../../core/services/toolbar.service';

@Component({
  selector: 'td-studio-shell',
  standalone: true,
  imports: [StudioHeader, StudioFooter, StudioDrawer, ChipModule],
  templateUrl: './studio-shell.html',
  styleUrl: './studio-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudioShell {
  private route = inject(ActivatedRoute);
  private toolbarService = inject(ToolbarService);

  // Convert the paramMap observable into a safe, reactive Signal tracking
  paramMapSignal = toSignal(this.route.paramMap);
  
  // Derive the active designId string cleanly using a computed signal frame
  designId = computed(() => this.paramMapSignal()?.get('designID') || '');

  // Expose drawer layout expansion properties natively to our HTML template layout
  isDrawerExpanded = computed(() => this.toolbarService.isDrawerExpanded());

  // Local component workspace signal layout state to toggle our canvas showcase templates
  activeView = signal<string>('dashboard');

  setView(viewName: string): void {
    this.activeView.set(viewName);
  }
}
