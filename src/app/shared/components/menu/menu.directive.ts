import {
  Directive,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  OnDestroy,
  Inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from './menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MenuItemDirective } from './menu-item/menu-item.directive';
import { MENU_CONFIG, MenuConfig } from './menu.config';

@Directive({
  selector: '[z-menu]',
  providers: [ClassnameService, MenuService]
})
export class MenuDirective implements OnChanges, OnInit, OnDestroy {
  @Output()
  readonly zClick = new EventEmitter<any>();
  @ContentChildren(MenuItemDirective, { descendants: true }) MenuItemDirectiveList: QueryList<
    MenuItemDirective
  > = {} as QueryList<MenuItemDirective>;

  @Input()
  indent: number = 40;

  private _destroy$ = new Subject();
  constructor(
    private _eleRef: ElementRef,
    private _classnameSer: ClassnameService,
    private _menuSer: MenuService,
    @Inject(MENU_CONFIG) private _menu: MenuConfig
  ) {}

  private _setClassName() {
    const prefix = this._menu.menuPrefix;
    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-root`]: true
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.indent) {
      this._menuSer.setIndent(this.indent);
    }
  }

  ngOnInit(): void {
    this._setClassName();

    this._menuSer.handleMenuItemClick$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this.zClick.emit(v);
      this.MenuItemDirectiveList.forEach(i => i.setSelectedState(i === v));
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
