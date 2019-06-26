import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutService } from '@app/layout/layout.service';
import { MenuComponent } from './sidebar/menu/menu.component';
import { SubmenuComponent } from './sidebar/menu/submenu/submenu.component';
import { MENU_CONFIG_PROVIDER } from '@app/config/menu.config';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LayoutComponent, MenuComponent, SubmenuComponent],
  imports: [CommonModule, SharedModule],
  exports: [LayoutComponent],
  providers: [LayoutService, MENU_CONFIG_PROVIDER]
})
export class LayoutModule {}
