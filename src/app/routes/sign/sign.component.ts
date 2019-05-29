import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.styl'],
})
export class SignComponent implements OnInit {
  useActive = false;

  constructor() {}

  open() {
    this.useActive = true;
  }
  close() {
    this.useActive = false;
  }

  ngOnInit() {}
}
