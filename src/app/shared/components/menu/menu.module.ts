import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './menu.directive';
import { MENU_COMPONENT_CONFIG_PROVIDER } from './menu.config';
import { SubmenuComponent } from './submenu/submenu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '@app/shared/modules/material/material.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { AddonModule } from '@app/core/addon/addon.module';

@NgModule({
  declarations: [MenuDirective, SubmenuComponent, MenuItemComponent],
  imports: [CommonModule, OverlayModule, MaterialModule, AddonModule],
  exports: [MenuDirective, SubmenuComponent, MenuItemComponent],
  providers: [MENU_COMPONENT_CONFIG_PROVIDER]
})
export class MenuModule {}
