import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';

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

  handleLogout() {
    console.log(1);
  }

  ngOnInit() {}
}
