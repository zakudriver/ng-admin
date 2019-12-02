import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutService } from '@app/layout/layout.service';
import { MENU_CONFIG_PROVIDER } from '@app/config/menu.config';
import { RecursiveTreeComponent } from './sidebar/recursive-tree/recursive-tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LayoutComponent, RecursiveTreeComponent],
  imports: [CommonModule, SharedModule, BrowserAnimationsModule],
  exports: [LayoutComponent],
  providers: [LayoutService, MENU_CONFIG_PROVIDER]
})
export class LayoutModule {}
