import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, switchMap, mergeMap, pairwise } from 'rxjs/operators';

@Injectable()
export class MenuService {
  handleMenuItemClick$ = new Subject<MenuItemComponent>();
  menuOpen$ = new BehaviorSubject<boolean>(false);
  indent$ = new BehaviorSubject<number>(40);
  collapsed$ = new BehaviorSubject<boolean>(true);

  menuItems: MenuItemComponent[] = [];
  router$ = this._router.events.pipe(filter(i => i instanceof NavigationEnd));
  // router$ = new BehaviorSubject(this._router.events.pipe(filter(i => i instanceof NavigationEnd))).pipe(
  //   mergeMap(i => i)
  // );

  constructor(private _router: Router, private activatedRoute: ActivatedRoute) {}

  handleMenuItemClick(v: MenuItemComponent) {
    this.handleMenuItemClick$.next(v);
  }

  setIndent(v: number) {
    this.indent$.next(v);
  }

  setCollapsed(v: boolean) {
    this.collapsed$.next(v);
  }

  addMenuItem(v: MenuItemComponent) {
    this.menuItems.push(v);
  }
}
