import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';
import { MethodLog } from '@app/core/utils/decorator';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'z-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  constructor(public layoutSer: LayoutService, private _matDialog: MatDialog) {}

  setCollapsedState() {
    this.layoutSer.setCollapsedState(!this.layoutSer.isCollapsed);
  }

  @MethodLog()
  handleLogout() {
    console.log(this.setCollapsedState);
    const dialogRef = this._matDialog.open(DialogComponent, { width: '250px' });
    dialogRef
      .afterClosed()
      .pipe(mergeMap(() => of(1)))
      .subscribe(v => {
        console.log(v);
      });
  }

  ngOnInit() {}
}
