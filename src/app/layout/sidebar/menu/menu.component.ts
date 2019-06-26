import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectionStrategy } from '@angular/core';
import { IMenu, IMenuTree } from './interface';
import { MENU_CONFIG, MenuConfig } from '@app/config/menu.config';

@Component({
  selector: 'app-menu',
  template: `
    <ul class="menu">
      <li class="menu-item" *ngFor="let i of menuTree">
        <app-submenu [submenu]="i" [selectedMenu]="selectedMenu" [openKey]="defaultOpenedMenu"></app-submenu>
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
  defaultOpenedMenu: number[] = [];

  @Output()
  change = new EventEmitter<IMenu>();

  menuTree: IMenuTree[] = [];

  constructor(@Inject(MENU_CONFIG) private _menu: MenuConfig) {
    this.menuTree = this._handleTree(_menu);
  }

  private _handleTree(menu: IMenuTree[], key: string = 'key', parentKey: string = 'parentKey'): IMenuTree[] {
    const r: IMenuTree[] = [];
    const children: IMenuTree[] = [];

    menu.forEach(i => {
      if (i[parentKey]) {
        children.push({ ...i });
      } else {
        r.push({ ...i });
      }
    });

    children.forEach(i => {
      r.forEach(j => {
        if (i[parentKey] === j[key]) {
          if (j.children) {
            j.children.push(i);
          } else {
            j.children = [i];
          }
        }
      });
    });

    return r;
  }

  ngOnInit() {}
}
