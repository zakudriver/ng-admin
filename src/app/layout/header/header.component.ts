import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';
import { sidebarMotion } from '@app/core/animations/sidebar.motion';

@Component({
  selector: 'z-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  animations: sidebarMotion
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
