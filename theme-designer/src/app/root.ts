import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'td-root',
  imports: [ButtonModule, RouterOutlet, ToolbarModule ],
  templateUrl: './root.html',
  styleUrl: './root.scss'
})
export class Root {
  protected readonly title = signal('PrimeNG Theme Designer');

  menuItems() {
    const start: Array<{ label: string; icon: string; routerLink: string[] }> = [
      { label: 'Setup', icon: 'pi pi-home', routerLink: ['/setup'] },
    ];

    const end: Array<unknown> = [];

    return { start, end };
  }
}
