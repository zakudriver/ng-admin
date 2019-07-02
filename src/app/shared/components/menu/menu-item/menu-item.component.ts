import { Component, ElementRef, OnInit, Input, Inject, OnDestroy, Optional, Renderer2, ViewChild } from '@angular/core';
import { Subject, merge, EMPTY } from 'rxjs';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from '../menu.service';
import { InputBoolean } from '@app/core/utils/convert';
import { MENU_CONFIG, MenuConfig } from '../menu.config';
import { SubmenuService } from '../submenu/submenu.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: '[z-menu-item]',
  template: `
    <div #MenuItem matRipple [style.paddingLeft.px]="paddingLeft" [ngClass]="classMap">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./menu-item.component.styl'],
  host: {
    '(click)': 'clickMenuItem($event)'
  },
  providers: [ClassnameService]
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input()
  @InputBoolean()
  selected: boolean = false;

  @Input()
  @InputBoolean()
  disabled: boolean = false;

  @ViewChild('MenuItem', { read: ElementRef, static: false })
  menuItemEle: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  selected$ = new Subject<boolean>();
  paddingLeft = 0;

  classMap = {};

  private _destroy$ = new Subject();
  constructor(
    private _classnameSer: ClassnameService,
    private _menuSer: MenuService,
    @Optional() private _submenuSer: SubmenuService,
    @Inject(MENU_CONFIG) private _menu: MenuConfig // private _renderer: Renderer2
  ) {}

  clickMenuItem(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled) {
      e.preventDefault();
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
    // this._classnameSer.updateClassName(this.menuItemEle.nativeElement, {
    //   [`${prefix}-item`]: true,
    //   [`${prefix}-selected`]: this.selected,
    //   [`${prefix}-disabled`]: this.disabled
    // });
    this.classMap = {
      [`${prefix}-item`]: true,
      [`${prefix}-selected`]: this.selected,
      [`${prefix}-disabled`]: this.disabled
    };
  }

  ngOnInit(): void {
    this._setClassName();

    const { indent$ } = this._menuSer;

    // if (this._eleRef.nativeElement.style['padding-left']) {
    //   this._originalPadding = parseInt(this._eleRef.nativeElement.style['padding-left'], 10);
    // }

    merge(indent$, this._submenuSer ? this._submenuSer.level$ : EMPTY)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        const level = this._submenuSer ? this._submenuSer.level$.value : 0;
        const padding = (level ? this._submenuSer.subIndent$.value * level : 0) + indent$.value;

        // if (padding) {
        //   this._renderer.setStyle(this._eleRef.nativeElement, 'padding-left', `${padding}px`);
        // } else {
        //   this._renderer.removeStyle(this._eleRef.nativeElement, 'padding-left');
        // }
        this.paddingLeft = padding;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
