import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
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
import { MenuService } from '../menu.service';
import { collapseMotion } from '@app/shared/components/menu/menu.motion';
import { MatMenuTrigger } from '@angular/material';
import { InputBoolean } from '@app/core/utils/decorators/prop';

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

  @ViewChild(MatMenuTrigger, { read: MatMenuTrigger, static: false }) subMenuEle: MatMenuTrigger = {} as MatMenuTrigger;

  paddingLeft = 0;
  expandState = 'collapsed';
  isCollapsed = false;
  classMap = {};

  private _destroy$ = new Subject<void>();
  constructor(
    private _menuSer: MenuService,
    private _submenuSer: SubmenuService,
    private _cdr: ChangeDetectorRef,
    @Inject(MENU_CONFIG) private _menu: MenuConfig
  ) {}

  clickSubMenuTitle(e: Event): void {
    e.stopPropagation();
    if (!this.disabled && !this.isCollapsed) {
      const { open$ } = this._submenuSer;
      this._setOpenState(!open$.value);
    }
  }

  private _setOpenState(open: boolean): void {
    this._submenuSer.setOpenState(open);
  }

  private _setClassName(): void {
    const prefix = this._menu.menuPrefix;
    const { open$ } = this._submenuSer;

    this.classMap = {
      [`${prefix}-submenu`]: true,
      [`${prefix}-disabled`]: this.disabled,
      [`${prefix}-open`]: open$.value,
      [`${prefix}-submenu-selected`]: open$.value,
      [`${prefix}-collapsed`]: this.isCollapsed
    };

    this._cdr.markForCheck();
  }

  ngOnInit() {
    const { indent$, collapsed$ } = this._menuSer;
    const { open$, level$, subIndent$ } = this._submenuSer;

    open$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this.expandState = v ? 'expanded' : 'collapsed';
      this._setClassName();
    });

    merge(level$, indent$, open$, collapsed$)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (collapsed$.value) {
          this.paddingLeft = 16;
        } else {
          this.paddingLeft = indent$.value + subIndent$.value * (level$.value - 1);
        }

        this.isCollapsed = collapsed$.value;

        this._setClassName();
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

  ngAfterViewInit(): void {
    this._submenuSer.setSubMenuTrigger(this.subMenuEle);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
