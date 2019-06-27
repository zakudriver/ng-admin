import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';
import { sidebarAnimate } from '@app/core/animations/sidebar';

@Component({
  selector: 'z-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl', './header.component.scss'],
  animations: sidebarAnimate
})
export class HeaderComponent implements OnInit {
  constructor(public layoutSer: LayoutService) {}

  ngOnInit() {}
}
