import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Inject,
  OnDestroy,
  Optional,
  ViewChild,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { Subject, merge, EMPTY } from 'rxjs';
import { MenuService } from '../menu.service';
import { InputBoolean } from '@app/core/utils/convert';
import { MENU_CONFIG, MenuConfig } from '../menu.config';
import { SubmenuService } from '../submenu/submenu.service';
import { takeUntil, filter } from 'rxjs/operators';
import { NavigationEnd, ActivationEnd } from '@angular/router';

@Component({
  selector: '[z-menu-item]',
  template: `
    <div #MenuItem matRipple [style.paddingLeft.px]="paddingLeft" [ngClass]="classMap">
      <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
      <ng-content select="[icon]" *ngIf="!icon"></ng-content>

      <span class="zyhh-menu-label">
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styleUrls: ['./menu-item.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'clickMenuItem($event)',
    class: 'outline'
  }
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input()
  @InputBoolean()
  selected: boolean = false;

  @Input()
  @InputBoolean()
  disabled: boolean = false;

  @Input() icon: string = '';

  @Input()
  routerLink: string[] = [];

  @ViewChild('MenuItem', { read: ElementRef, static: false })
  menuItemEle: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  selected$ = new Subject<boolean>();
  paddingLeft = 0;

  classMap = {};

  private _destroy$ = new Subject();
  constructor(
    private _menuSer: MenuService,
    @Optional() private _submenuSer: SubmenuService,
    private _cdr: ChangeDetectorRef,
    @Inject(MENU_CONFIG) private _menu: MenuConfig // private _renderer: Renderer2
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
    this.selected$.next(v);
    this._setClassName();
    this._cdr.markForCheck();
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
      [`${prefix}-disabled`]: this.disabled,
      ['primaryColor']: this.selected
    };
  }

  ngOnInit(): void {
    this._setClassName();
    const { indent$ } = this._menuSer;

    merge(indent$, this._submenuSer ? this._submenuSer.level$ : EMPTY)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        const level = this._submenuSer ? this._submenuSer.level$.value : 0;
        const padding = (level ? this._submenuSer.subIndent$.value * level : 0) + indent$.value;

        this.paddingLeft = padding;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSelected) {
      this.setSelectedState(this.disabled);
    }
    if (changes.disabled) {
      this._setClassName();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
