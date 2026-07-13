import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'studio-drawer',
  templateUrl: './studio-drawer.html',
  styleUrls: ['./studio-drawer.css'],
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StudioDrawer {
  tabs = [
    { label: 'Primitive', path: 'primitive' },
    { label: 'Semantic', path: 'semantic' },
    { label: 'Colors', path: 'colors' },
    { label: 'Components', path: 'components' },
    { label: 'Custom Tokens', path: 'custom' },
    { label: 'Schema', path: 'schema' },
  ];

  updateSchema(): void {
    // Implementation to be added later
  }

  resetPreset(): void {
    // Implementation to be added later
  }

  exportSchema(): void {
    // Implementation to be added later
  }
}
