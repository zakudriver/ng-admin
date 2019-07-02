import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './menu.directive';
import { MENU_CONFIG_PROVIDE } from './menu.config';
import { SubmenuComponent } from './submenu/submenu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '@app/shared/modules/material/material.module';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [MenuDirective, SubmenuComponent, MenuItemComponent],
  imports: [CommonModule, OverlayModule, MaterialModule],
  exports: [MenuDirective, SubmenuComponent, MenuItemComponent],
  providers: [MENU_CONFIG_PROVIDE]
})
export class MenuModule {}
