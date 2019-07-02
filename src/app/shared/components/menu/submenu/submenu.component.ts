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
  Renderer2
} from '@angular/core';
import { SubmenuService } from './submenu.service';
import { ClassnameService } from '@app/core/services/classname.service';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MENU_CONFIG, MenuConfig } from '../menu.config';
import { InputBoolean } from '@app/core/utils/convert';
import { MenuService } from '../menu.service';
import { collapseMotion } from '@app/core/animations/menu.motion';

@Component({
  selector: '[z-submenu]',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.styl'],
  providers: [ClassnameService, SubmenuService],
  animations: [collapseMotion],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() disabled: boolean = false;
  @Input() @InputBoolean() open: boolean = false;

  @Input() title: string | TemplateRef<void> = '';
  @Input() subIndent: number = 16;

  expandState = 'collapsed';
  paddingLeft = 0;

  private _isChildMenuSelected = false;
  private _isMouseHover = false;

  private _destroy$ = new Subject<void>();
  constructor(
    private _eleRef: ElementRef,
    private _menuSer: MenuService,
    private _submenuSer: SubmenuService,
    private _classnameSer: ClassnameService,
    private _cdr: ChangeDetectorRef,
    @Inject(MENU_CONFIG) private _menu: MenuConfig,
    private _renderer: Renderer2
  ) {}

  private _setOpenState(open: boolean): void {
    this._submenuSer.setOpenState(open);
  }

  clickSubMenuTitle(): void {
    if (!this.disabled) {
      this._setOpenState(!this.open);
    }
  }

  setMouseEnterState(value: boolean): void {
    this._isMouseHover = value;
    this._setClassName();
    this._submenuSer.setMouseEnterState(value);
  }

  private _setClassName(): void {
    const prefix = this._menu.submenuPrefix;

    this._classnameSer.updateClassName(this._eleRef.nativeElement, {
      [`${prefix}-submenu`]: true,
      [`${prefix}-disabled`]: this.disabled,
      [`${prefix}-open`]: this.open,
      [`${prefix}-selected`]: this._isChildMenuSelected,
      [`${prefix}-active`]: this._isMouseHover && !this.disabled
    });
  }

  ngOnInit() {
    this._submenuSer.open$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      if (v !== this.open) {
        this.open = v;
      }
      this.expandState = v ? 'expanded' : 'collapsed';
      this._setClassName();
    });

    this._submenuSer.subMenuOpen$.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this._menuSer.menuOpen$.next(v);
    });

    merge(this._submenuSer.level$, this._menuSer.indent$, this._submenuSer.open$)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        const level = this._submenuSer.level$.value;
        const padding = level > 1 ? this._submenuSer.subIndent$.value : this._menuSer.indent$.value;

        if (padding) {
          this._renderer.setStyle(this._eleRef.nativeElement, 'padding-left', `${padding}px`);
        } else {
          this._renderer.removeStyle(this._eleRef.nativeElement, 'padding-left');
        }

        this._cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      this._submenuSer.setOpenState(this.open);
    }
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
