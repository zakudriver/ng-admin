import { Component, Inject, OnInit } from '@angular/core';
import { sidebarMotion } from '@app/core/animations/sidebar.motion';
import { LayoutService } from '@app/layout/layout.service';
import { MenuItemComponent } from '@app/shared/components/menu/menu-item/menu-item.component';
import { IMenu, IMenuTree, MENU_CONFIG } from '@app/config/menu.config';

@Component({
  selector: 'z-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl'],
  animations: sidebarMotion
})
export class SidebarComponent implements OnInit {
  tree: IMenuTree[] = [];
  path = '/sign';
  constructor(public layoutSer: LayoutService, @Inject(MENU_CONFIG) private _menu: IMenu[]) {
    this.tree = this._handleTree(_menu);
    console.log(this.tree);
  }

  changeMenu(v: MenuItemComponent) {}

  private _handleTree(menu: IMenu[], len: number = 1, r: IMenuTree[] = []) {
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

    r.forEach(i => {
      this._handleChildTree(i, children);
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
      children.forEach(i => {
        if (i.parentKey === node.key) {
          if (node.children) {
            node.children.push(i);
          } else {
            node.children = [i];
          }
        }
      });
    }
  }

  ngOnInit() {}
}
