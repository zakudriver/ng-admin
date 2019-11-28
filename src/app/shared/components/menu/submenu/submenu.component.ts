import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  ElementRef,
  OnDestroy,
  Inject,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { SubmenuService } from './submenu.service';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MENU_CONFIG, MenuConfig } from '../menu.config';
import { InputBoolean } from '@app/core/utils/convert';
import { MenuService } from '../menu.service';
import { collapseMotion } from '@app/core/animations/menu.motion';

@Component({
  selector: '[z-submenu]',
  templateUrl: './submenu.component.html',
  providers: [SubmenuService],
  animations: [collapseMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'clickSubMenuTitle($event)'
  }
})
export class SubmenuComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() disabled = false;
  // @Input() @InputBoolean() open = false;

  @Input() title: string | TemplateRef<void> = '';
  @Input() subIndent = 16;
  @Input() icon = '';

  @ViewChild('SubMenu', { read: ElementRef, static: false })
  subMenuEle: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;

  paddingLeft = 0;
  expandState = 'collapsed';
  isCollapsed = false;
  classMap = {};

  private _isMouseHover = false;

  private _destroy$ = new Subject<void>();
  constructor(
    private _menuSer: MenuService,
    private _submenuSer: SubmenuService,
    private _cdr: ChangeDetectorRef,
    @Inject(MENU_CONFIG) private _menu: MenuConfig
  ) {}

  private _setOpenState(open: boolean): void {
    this._submenuSer.setOpenState(open);
  }

  clickSubMenuTitle(e: Event): void {
    e.stopPropagation();
    if (!this.disabled) {
      const { open$ } = this._submenuSer;
      this._setOpenState(!open$.value);
    }
  }

  setMouseEnterState(value: boolean): void {
    this._isMouseHover = value;
    this._setClassName();
    this._submenuSer.setMouseEnterState(value);
  }

  private _setClassName(): void {
    const prefix = this._menu.menuPrefix;
    const { open$ } = this._submenuSer;

    this.classMap = {
      [`${prefix}-submenu`]: true,
      [`${prefix}-disabled`]: this.disabled,
      [`${prefix}-open`]: open$.value,
      [`${prefix}-submenu-selected`]: open$.value,
      [`${prefix}-active`]: this._isMouseHover && !this.disabled
    };
  }

  ngOnInit() {
    const { indent$, collapsed$ } = this._menuSer;
    const { open$, level$, subIndent$ } = this._submenuSer;

    open$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      // if (v !== open$.value) {
      //   this.open = v;
      // }
      this.expandState = v ? 'expanded' : 'collapsed';
      this._setClassName();
    });

    merge(level$, indent$, open$, collapsed$)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (collapsed$.value) {
          this.paddingLeft = 0;
        } else {
          this.paddingLeft = indent$.value + subIndent$.value * (level$.value - 1);
        }

        this.isCollapsed = collapsed$.value;
        this._cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      this._submenuSer.disabled = this.disabled;
      this._setClassName();
    }
    if (changes.subIndent) {
      this._submenuSer.setSubIndent(this.subIndent);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
