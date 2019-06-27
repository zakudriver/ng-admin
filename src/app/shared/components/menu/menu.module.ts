import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemDirective } from './menu-item.directive';
import { MenuDirective } from './menu.directive';

@NgModule({
  declarations: [MenuItemDirective, MenuDirective],
  imports: [CommonModule, MenuItemDirective, MenuDirective],
  exports: [MenuItemDirective, MenuDirective]
})
export class MenuModule {}
