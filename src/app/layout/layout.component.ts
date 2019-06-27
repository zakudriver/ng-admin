import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';

@Component({
  selector: 'z-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {
  constructor(public layoutSer: LayoutService) {}

  ngOnInit() {}
}
