import { Component, OnInit } from '@angular/core';
import { sidebarAnimate } from '@app/core/animations/sidebar';
import { LayoutService } from '@app/layout/layout.service';

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls  : ['./sidebar.component.styl'],
  animations : sidebarAnimate
})
export class SidebarComponent implements OnInit {

  constructor(public layoutSer: LayoutService) {
  }

  ngOnInit() {
  }

}
