import { Directive, ElementRef, OnInit, Input, Inject, OnDestroy, Optional, Renderer2 } from '@angular/core';
import { Subject, merge, EMPTY } from 'rxjs';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from '../menu.service';
import { InputBoolean } from '@app/core/utils/convert';
import { MENU_CONFIG, MenuConfig } from '../menu.config';
import { SubmenuService } from '../submenu/submenu.service';
import { takeUntil } from 'rxjs/operators';

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

  private _originalPadding = 0;
  private _destroy$ = new Subject();
  constructor(
    private _eleRef: ElementRef,
    private _classnameSer: ClassnameService,
    private _menuSer: MenuService,
    @Optional() private _submenuSer: SubmenuService,
    @Inject(MENU_CONFIG) private _menu: MenuConfig,
    private _renderer: Renderer2
  ) {}

  clickMenuItem(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this._menuSer.handleMenuItemClick(this);
    // if (this.nzSubmenuService) {
    //   this.nzSubmenuService.handleMenuItemClick();
    // }
  }

  setSelectedState(v: boolean) {
    this.selected = v;
    this.selected$.next(v);
    this._setClassName();
  }

  private _setClassName() {
    const prefix = this._menu.menuPrefix;
    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}-item`]: true,
      [`${prefix}-selected`]: this.selected,
      [`${prefix}-disabled`]: this.disabled
    });
  }

  ngOnInit(): void {
    this._setClassName();

    if (this._eleRef.nativeElement.style['padding-left']) {
      this._originalPadding = parseInt(this._eleRef.nativeElement.style['padding-left'], 10);
    }

    merge(this._menuSer.indent$, this._submenuSer ? this._submenuSer.level$ : EMPTY)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        const level = this._submenuSer ? this._submenuSer.level$.value : 0;
        const padding = level ? this._submenuSer.subIndent$.value : this._menuSer.indent$.value;

        if (padding) {
          this._renderer.setStyle(this._eleRef.nativeElement, 'padding-left', `${padding}px`);
        } else {
          this._renderer.removeStyle(this._eleRef.nativeElement, 'padding-left');
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
