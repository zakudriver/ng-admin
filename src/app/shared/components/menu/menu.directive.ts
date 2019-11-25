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
  defaultOpenKey: string[] = [];

  @Input()
  selectedKey = '';

  private destroy$ = new Subject();
  constructor(
    private eleRef: ElementRef,
    private classnameSer: ClassnameService,
    private menuSer: MenuService,
    @Inject(MENU_CONFIG) private menu: MenuConfig
  ) {}

  private setClassName() {
    const prefix = this.menu.menuPrefix;
    this.classnameSer.updateClassName(this.eleRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-root`]: true
    });
  }

  ngOnInit(): void {
    this.setClassName();
    const { menuItems, handleMenuItemClick$ } = this.menuSer;

    const list = this.menuItemList.length ? this.menuItemList : menuItems;

    handleMenuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.change.emit(v);
      list.forEach(i => {
        i.setSelectedState(i === v);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.indent) {
      this.menuSer.setIndent(this.indent);
    }

    if (changes.defaultOpenKey) {
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
