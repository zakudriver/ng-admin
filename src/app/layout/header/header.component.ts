import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';
import { MethodLog } from '@app/core/utils/decorator';

@Component({
  selector: 'z-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  constructor(public layoutSer: LayoutService) {}

  setCollapsedState() {
    this.layoutSer.setCollapsedState(!this.layoutSer.isCollapsed);
  }

  @MethodLog()
  handleLogout() {
    console.log(this.setCollapsedState);
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('ok');
      }, 4000);
    });
  }

  ngOnInit() {}
}
