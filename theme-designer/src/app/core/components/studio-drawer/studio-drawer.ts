import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { ToolbarService } from '@services/toolbar.service';

@Component({
  selector: 'td-studio-drawer',
  templateUrl: './studio-drawer.html',
  styleUrls: ['./studio-drawer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DrawerModule, ButtonModule, TabsModule]
})
export class StudioDrawer {
  private toolbarService = inject(ToolbarService);
  isDrawerVisible = signal(true);
  headerText = signal('');

  closeDrawer() {
    this.isDrawerVisible.set(false);
  }
}
