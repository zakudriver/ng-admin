import { Directive, ElementRef, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from './menu.service';
import { InputBoolean } from '@app/core/util/convert';
import { MENU_CONFIG, MenuConfig } from './menu.config';

@Directive({
  selector: '[z-menu-item]',
  providers: [ClassnameService],
  host: {
    '(click)': 'clickMenuItem($event)'
  }
})
export class MenuItemDirective implements OnInit, OnDestroy {
  @Input()
  @InputBoolean()
  selected: boolean = false;

  @Input()
  @InputBoolean()
  disabled: boolean = false;

  selected$ = new Subject<boolean>();

  private _destroy$ = new Subject();
  constructor(
    private _eleRef: ElementRef,
    private _classnameSer: ClassnameService,
    private _menuSer: MenuService,
    @Inject(MENU_CONFIG) private _menu: MenuConfig
  ) {}

  clickMenuItem(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this._menuSer.onMenuItemClick(this);
    // if (this.nzSubmenuService) {
    //   this.nzSubmenuService.onMenuItemClick();
    // }
  }

  setSelectedState(v: boolean) {
    this.selected = v;
    this.selected$.next(v);
    this._setClassName();
  }

  private _setClassName() {
    const prefix = this._menu.prefixName;
    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-selected`]: this.selected,
      [`${prefix}-disabled`]: this.disabled
    });
  }

  ngOnInit(): void {
    this._setClassName();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
