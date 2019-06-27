import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItemDirective } from './menu-item.directive';

@Injectable()
export class MenuService {
  handleMenuItemClick$ = new Subject<MenuItemDirective>();

  constructor() {}

  onMenuItemClick(menu: MenuItemDirective) {
    this.handleMenuItemClick$.next(menu);
  }
}
