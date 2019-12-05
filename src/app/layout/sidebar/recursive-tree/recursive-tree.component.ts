import { Component, OnInit, Input } from '@angular/core';
import { IMenuTree } from '@app/config/menu.config';

@Component({
  selector: 'z-recursive-tree',
  template: `
    <ng-container *ngFor="let i of data">
      <li z-submenu [icon]="i.icon" *ngIf="i.children; else MenuItem">
        <span title>{{ i.name }}</span>

        <z-recursive-tree [data]="i.children" *ngIf="i.children"></z-recursive-tree>
      </li>

      <ng-template #MenuItem>
        <li z-menu-item [icon]="i.icon" [routerLink]="[i.path]">{{ i.name }}</li>
      </ng-template>
    </ng-container>
  `
})
export class RecursiveTreeComponent implements OnInit {
  @Input()
  data: IMenuTree[] = [];

  constructor() {}

  ngOnInit() {}
}
