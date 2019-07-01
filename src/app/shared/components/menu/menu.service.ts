import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MenuItemDirective } from './menu-item.directive';

@Injectable()
export class MenuService {
  handleMenuItemClick$ = new Subject<MenuItemDirective>();
  menuOpen$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  onMenuItemClick(menu: MenuItemDirective) {
    this.handleMenuItemClick$.next(menu);
  }
}
