import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'z-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {
  constructor() {}

  ontest() {
    // this.http.get('/usersvc/logout').subscribe(r => {
    //   console.log(r);
    // });
  }

  ngOnInit() {}
}
