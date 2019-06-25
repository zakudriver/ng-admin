import { Component, OnInit, Input } from '@angular/core';
import { menuAnimate } from '@app/core/animations/menu';

@Component({
  selector: 'app-submenu',
  template: `
    <button class="menubtn" matRipple (click)="handleClick()"><span>menu</span></button>
    <ul class="submenu" @menu [ngStyle]="{ display: useOpen ? 'block' : 'none' }">
      <li>
        <a class="a-color" [routerLink]="['/routePath']">aaa</a>
      </li>
      <li>
        <a class="a-color" [routerLink]="['/routePath']">aaa</a>
      </li>
    </ul>
  `,
  styleUrls: ['../menu.component.styl'],
  animations: menuAnimate
})
export class SubmenuComponent implements OnInit {
  @Input()
  useOpen = false;

  constructor() {}

  handleClick() {
    this.useOpen = !this.useOpen;
  }

  ngOnInit() {}
}
