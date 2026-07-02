import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'td-root',
  imports: [ButtonModule, RouterOutlet],
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
