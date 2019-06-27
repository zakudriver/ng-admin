import {
  Directive,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from './menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MenuItemDirective } from './menu-item.directive';

@Directive({
  selector: '[zMenu]',
  providers: [ClassnameService, MenuService]
})
export class MenuDirective implements OnInit, OnDestroy {
  @Output()
  readonly onClick = new EventEmitter<MenuItemDirective>();
  @ContentChildren(MenuItemDirective, { descendants: true }) MenuItemDirectiveList: QueryList<
    MenuItemDirective
  > = {} as QueryList<MenuItemDirective>;

  private _destroy$ = new Subject();
  constructor(private _eleRef: ElementRef, private _classnameSer: ClassnameService, private _menuSer: MenuService) {}

  private _setClassName() {
    const prefix = 'zyhh-menu';
    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-root`]: true
    });
  }

  ngOnInit(): void {
    this._setClassName();

    this._menuSer.handleMenuItemClick$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this.onClick.emit(v);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
