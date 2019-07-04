import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Injectable()
export class MenuService {
  handleMenuItemClick$ = new Subject<MenuItemComponent>();
  menuOpen$ = new BehaviorSubject<boolean>(false);
  indent$ = new BehaviorSubject<number>(40);

  menuItems: MenuItemComponent[] = [];
  constructor() {}

  handleMenuItemClick(v: MenuItemComponent) {
    this.handleMenuItemClick$.next(v);
  }

  setIndent(v: number): void {
    this.indent$.next(v);
  }

  addMenuItem(v: MenuItemComponent) {
    this.menuItems.push(v);
  }
}
