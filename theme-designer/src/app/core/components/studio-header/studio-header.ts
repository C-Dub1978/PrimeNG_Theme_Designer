import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleButton } from '../theme-toggle-button/theme-toggle-button';

@Component({
  selector: 'td-studio-header',
  imports: [ThemeToggleButton],
  templateUrl: './studio-header.html',
  styleUrl: './studio-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudioHeader {
  title = signal<string>('Theme Designer Studio');
}
