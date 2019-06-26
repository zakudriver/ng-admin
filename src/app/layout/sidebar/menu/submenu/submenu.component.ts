import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { menuAnimate } from '@app/core/animations/menu';
import { IMenuTree } from '../interface';

@Component({
  selector: 'app-submenu',
  template: `
    <button class="menubtn" matRipple (click)="handleClick()">
      <span>{{ submenu.name }}</span>
    </button>
    <ul class="submenu" @menu *ngIf="isOpen && submenu.children">
      <li *ngFor="let i of submenu.children">
        <a class="a-color" [routerLink]="[i.path]">aaa</a>
      </li>
    </ul>
  `,
  styleUrls: ['../menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: menuAnimate
})
export class SubmenuComponent implements OnInit, OnChanges {
  @Input()
  submenu: IMenuTree = {} as IMenuTree;

  @Input()
  selectedMenu: number = 0;

  @Input()
  openKey: number[] = [];

  isSelect = false;
  isOpen = false;

  constructor() {}

  handleClick() {
    this.isOpen = !this.isOpen;
  }

  private _handleSelected(select: number) {
    this.isSelect = this.submenu.key === select;
  }

  private _handleOpen(opens: number[]) {
    this.isOpen = opens.some(i => i === this.submenu.key);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openKey) {
      this._handleOpen(changes.openKey.currentValue);
    }

    if (changes.selectedMenu) {
      this._handleSelected(changes.selectedMenu.currentValue);
    }
  }
}
