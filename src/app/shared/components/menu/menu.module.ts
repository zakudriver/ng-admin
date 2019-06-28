import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemDirective } from './menu-item.directive';
import { MenuDirective } from './menu.directive';
import { MENU_CONFIG_PROVIDE } from './menu.config';
import { SubmenuComponent } from './submenu/submenu.component';

@NgModule({
  declarations: [MenuItemDirective, MenuDirective, SubmenuComponent],
  imports: [CommonModule],
  exports: [MenuItemDirective, MenuDirective],
  providers: [MENU_CONFIG_PROVIDE]
})
export class MenuModule {}
