import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MenuItemDirective } from './menu-item.directive';

@Injectable()
export class MenuService {
  handleMenuItemClick$ = new Subject<MenuItemDirective>();
  menuOpen$ = new BehaviorSubject<boolean>(false);
  indent$ = new BehaviorSubject<number>(40);

  constructor() {}

  handleMenuItemClick(menu: MenuItemDirective) {
    this.handleMenuItemClick$.next(menu);
  }

  setIndent(v: number): void {
    this.indent$.next(v);
  }
}
