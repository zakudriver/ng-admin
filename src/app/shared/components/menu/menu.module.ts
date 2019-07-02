import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemDirective } from './menu-item/menu-item.directive';
import { MenuDirective } from './menu.directive';
import { MENU_CONFIG_PROVIDE } from './menu.config';
import { SubmenuComponent } from './submenu/submenu.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [MenuItemDirective, MenuDirective, SubmenuComponent],
  imports: [CommonModule, OverlayModule],
  exports: [MenuItemDirective, MenuDirective, SubmenuComponent],
  providers: [MENU_CONFIG_PROVIDE]
})
export class MenuModule {}
