import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectionStrategy,
  ViewChild,
  ViewChildren,
  ElementRef
} from '@angular/core';
import { IMenu, IMenuTree } from './interface';
import { MENU_CONFIG, MenuConfig } from '@app/config/menu.config';

@Component({
  selector: 'z-menu',
  template: `
    <ul class="ul menu" (click)="clickEntrust($event)">
      <li class="menu-item" *ngFor="let i of menuTree">
        <z-submenu #MenuList [submenu]="i" [selectedMenu]="selectedMenu" [openKey]="defaultOpenedMenu"></z-submenu>
      </li>
    </ul>
  `,
  styleUrls: ['./menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input()
  selectedMenu: string = '';

  @Input()
  defaultOpenedMenu: string[] = [];

  @Output()
  change = new EventEmitter<IMenu>();

  @ViewChildren('MenuList')
  menuList: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;

  menuTree: IMenuTree[] = [];

  constructor(@Inject(MENU_CONFIG) private _menu: MenuConfig) {
    this.menuTree = this._handleTree(_menu);
  }

  private _handleTree(menu: IMenu[], len: number = 1, r: IMenuTree[] = []): IMenuTree[] {
    const children: IMenu[] = [];
    const o: IMenu[] = [];

    menu.forEach(i => {
      if (i.parentKey) {
        if (i.parentKey.length === len) {
          children.push({ ...i });
        } else {
          o.push({ ...i });
        }
      } else {
        r.push({ ...i });
      }
    });

    r.forEach(j => {
      this._handleChildTree(j, children);
    });

    if (o.length > 0) {
      this._handleTree(o, len + 1, r);
    }

    return r;
  }

  private _handleChildTree(node: IMenuTree, children: IMenu[]) {
    if (node.children) {
      node.children.forEach(i => {
        this._handleChildTree(i, children);
      });
    } else {
      node.children = [];
      children.forEach(i => {
        if (i.parentKey === node.key) {
          node.children!.push(i);
        }
      });
    }
  }

  clickEntrust(e: Event) {
    console.log(this.menuList);
  }

  ngOnInit() {}
}
