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
  SimpleChanges,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { ClassnameService } from '@app/core/services/classname.service';
import { MenuService } from './menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MENU_CONFIG, MenuConfig } from './menu.config';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Directive({
  selector: '[z-menu]',
  providers: [ClassnameService, MenuService]
})
export class MenuDirective implements OnChanges, OnInit, OnDestroy {
  @Output()
  readonly change = new EventEmitter<any>();
  @ContentChildren(MenuItemComponent, { descendants: true }) menuItemList: QueryList<
    MenuItemComponent
  > = {} as QueryList<MenuItemComponent>;

  @Input()
  indent = 40;

  @Input()
  isCollapsed = false;

  @Input()
  width = 240;

  private _destroy$ = new Subject();
  private _renderer: Renderer2 = this._rendererFactory2.createRenderer(null, null);
  private _collapsedWidth = 60;

  constructor(
    private _eleRef: ElementRef,
    private _classnameSer: ClassnameService,
    private _menuSer: MenuService,
    private _rendererFactory2: RendererFactory2,
    @Inject(MENU_CONFIG) private _menuConf: MenuConfig
  ) {}

  private _setClassName() {
    const prefix = this._menuConf.menuPrefix;
    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-root`]: true
    });
  }

  private _setWidth(width?: string | number) {
    const w = width || this.width;
    this._renderer.setStyle(this._eleRef.nativeElement, 'width', typeof w === 'string' ? w : `${w}px`);
  }

  ngOnInit(): void {
    this._setClassName();
    this._setWidth();

    const { menuItems, handleMenuItemClick$, collapsed$ } = this._menuSer;

    const list = this.menuItemList.length ? this.menuItemList : menuItems;

    handleMenuItemClick$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this.change.emit(v);
      list.forEach(i => {
        i.setSelectedState(i === v);
      });
    });

    collapsed$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this._setWidth(v ? this._collapsedWidth : this.width);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.indent) {
      this._menuSer.setIndent(this.indent);
    }

    if (changes.isCollapsed) {
      this._menuSer.setCollapsed(this.isCollapsed);
    }

    if (changes.width) {
      this._setWidth();
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
