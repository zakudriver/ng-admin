import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, MatSnackBarModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatRippleModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports     : [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatRippleModule],
  exports     : [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatRippleModule],
})
export class MaterialModule {
}
