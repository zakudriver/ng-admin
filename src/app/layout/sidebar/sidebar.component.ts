import { Component, Inject, OnInit } from '@angular/core';
import { sidebarAnimate } from '@app/core/animations/sidebar';
import { LayoutService } from '@app/layout/layout.service';
import { APP_CONFIG, AppConfig, Routes } from '@app/config/app.config';

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls  : ['./sidebar.component.styl'],
  animations : sidebarAnimate
})
export class SidebarComponent implements OnInit {
  routes: Routes;

  constructor(public layoutSer: LayoutService, @Inject(APP_CONFIG) private _config: AppConfig) {
    this.routes = _config.routes;
  }

  ngOnInit() {
  }

}
