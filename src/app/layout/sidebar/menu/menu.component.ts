import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMenu } from './interface';

interface IMenuTree extends IMenu {
  children?: IMenu[];
}

@Component({
  selector: 'app-menu',
  template: `
    <ul class="menu">
      <li class="menu-item">
        <app-submenu></app-submenu>
        <app-submenu></app-submenu>
      </li>
    </ul>
  `,
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {
  @Input()
  menu: IMenu;

  @Input()
  selectedMenu: string[];

  @Input()
  openedMenu: string[];

  @Output()
  change = new EventEmitter<IMenu>();

  constructor() {}

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
