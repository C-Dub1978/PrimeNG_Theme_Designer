import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { StudioHeader } from '@core/components/studio-header/studio-header';
import { StudioFooter } from '@core/components/studio-footer/studio-footer';

@Component({
  selector: 'td-studio-shell',
  standalone: true,
  // imports: [StudioHeader, StudioFooter, RouterOutlet],
  templateUrl: './studio-shell.html',
  styleUrl: './studio-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudioShell {
  private route = inject(ActivatedRoute);
  
  // Convert the paramMap observable into a safe, reactive Signal
  paramMapSignal = toSignal(this.route.paramMap);
  
  // Derive the designId string cleanly using a computed signal
  designId = computed(() => this.paramMapSignal()?.get('designID') || '');
  
  // Expose a public, writable signal named isDrawerOpen initialized to true
  isDrawerOpen = signal(true);
}
