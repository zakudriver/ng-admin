import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'z-admin',
  template: `
    <mat-tab-group>
      <mat-tab label="User"> <z-user></z-user> </mat-tab>
      <mat-tab label="Setting"> Content 2 </mat-tab>
    </mat-tab-group>
  `
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
