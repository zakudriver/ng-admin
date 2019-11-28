import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Inject,
  OnDestroy,
  Optional,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  RendererFactory2,
  Renderer2
} from '@angular/core';
import { Subject, merge, EMPTY } from 'rxjs';
import { MenuService } from '../menu.service';
import { InputBoolean } from '@app/core/utils/convert';
import { MENU_CONFIG, MenuConfig } from '../menu.config';
import { SubmenuService } from '../submenu/submenu.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: '[z-menu-item]',
  template: `
    <ng-container *ngIf="isCollapsed; else CollapsedTemplate">
      <div matRipple [ngClass]="classMap">
        <mat-icon style="margin-right:0;" *ngIf="icon">{{ icon }}</mat-icon>
        <ng-content select="[icon]" *ngIf="!icon"></ng-content>
      </div>
    </ng-container>

    <ng-template #CollapsedTemplate>
      <div matRipple [style.paddingLeft.px]="paddingLeft" [ngClass]="classMap">
        <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
        <ng-content select="[icon]" *ngIf="!icon"></ng-content>

        <span class="z-menu-label" *ngIf="!isCollapsed">
          <ng-content></ng-content>
        </span>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'clickMenuItem($event)',
    class: 'outline'
  }
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input()
  @InputBoolean()
  selected = false;

  @Input()
  @InputBoolean()
  disabled = false;

  @Input() icon = '';

  @Input()
  routerLink: string[] = [];

  // @ViewChild('MenuItem', { read: ElementRef, static: false })
  // menuItemEle: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  // selected$ = new Subject<boolean>();
  paddingLeft = 0;
  isCollapsed = false;

  classMap = {};

  private _renderer: Renderer2 = this._rendererFactory2.createRenderer(null, null);
  private _destroy$ = new Subject();
  constructor(
    private _eleRef: ElementRef,
    private _rendererFactory2: RendererFactory2,
    private _menuSer: MenuService,
    @Optional() private _submenuSer: SubmenuService,
    private _cdr: ChangeDetectorRef,
    @Inject(MENU_CONFIG) private _menu: MenuConfig,
    private _router: Router
  ) {
    _menuSer.addMenuItem(this);
  }

  clickMenuItem(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this._menuSer.handleMenuItemClick(this);
  }

  setSelectedState(v: boolean) {
    this.selected = v;
    this._setClassName();
    this._cdr.markForCheck();
  }

  private _setClassName() {
    const prefix = this._menu.menuPrefix;
    this.classMap = {
      [`${prefix}-item`]: true,
      [`${prefix}-selected`]: this.selected,
      [`${prefix}-disabled`]: this.disabled,
      ['primaryColor']: this.selected
    };
  }

  private _handleUrlIsSelected(url: string): boolean {
    if (this.routerLink.length) {
      return this.routerLink[0].replace(/\?{1}.*$/, '') === url;
    }

    return false;
  }

  ngOnInit(): void {
    this._renderer.setStyle(this._eleRef.nativeElement, 'list-style', 'none');
    const { indent$, collapsed$ } = this._menuSer;

    merge(indent$, collapsed$, this._submenuSer ? this._submenuSer.level$ : EMPTY)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.isCollapsed = collapsed$.value;
        if (collapsed$.value) {
          this.paddingLeft = 0;
        } else {
          const level = this._submenuSer ? this._submenuSer.level$.value : 0;

          this.paddingLeft = (level ? this._submenuSer.subIndent$.value * level : 0) + indent$.value;
        }
      });

    const isSelected = this._handleUrlIsSelected(this._router.url);
    this.setSelectedState(isSelected);
    if (this._submenuSer && isSelected) {
      this._submenuSer.setOpenState(isSelected);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      this._setClassName();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
