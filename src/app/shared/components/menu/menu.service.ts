import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter, switchMap, mergeMap, pairwise } from 'rxjs/operators';

@Injectable()
export class MenuService {
  handleMenuItemClick$ = new Subject<MenuItemComponent>();
  menuOpen$ = new BehaviorSubject<boolean>(false);
  indent$ = new BehaviorSubject<number>(40);

  menuItems: MenuItemComponent[] = [];
  router$ = this._router.events.pipe(filter(i => i instanceof NavigationEnd));
  // router$ = new BehaviorSubject(this._router.events.pipe(filter(i => i instanceof NavigationEnd))).pipe(
  //   mergeMap(i => i)
  // );

  constructor(private _router: Router) {
    // this.router$.subscribe(r => {
    //   console.log(r);
    // });
  }

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
