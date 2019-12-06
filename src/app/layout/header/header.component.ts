import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from '@app/layout/layout.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { mergeMap } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'z-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  constructor(
    public layoutSer: LayoutService,
    private _matDialog: MatDialog,
    private _userSer: UserService,
    private _snackBar: MatSnackBar
  ) {}

  setCollapsedState() {
    this.layoutSer.setCollapsedState(!this.layoutSer.isCollapsed);
  }

  handleLogout() {
    this._matDialog
      .open(DialogComponent, { width: '250px' })
      .afterClosed()
      .pipe(mergeMap(() => this._userSer.logout()))
      .subscribe(v => {
        if (v.msg) {
          this._snackBar.open(v.msg);
        }
      });
  }

  ngOnInit() {}
}
