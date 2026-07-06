import { Component } from '@angular/core';

@Component({
  selector: 'td-theme-toggle-button',
  imports: [],
  templateUrl: './theme-toggle-button.html',
  styleUrl: './theme-toggle-button.scss',
})
export class ThemeToggleButton {
    private readonly moonEmoji = '🌚';
    private readonly sunEmoji = '🌞';
}
