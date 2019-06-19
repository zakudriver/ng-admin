import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, MatSnackBarModule, MatListModule, MatMenuModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports     : [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatListModule, MatMenuModule],
  exports     : [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatListModule, MatMenuModule],
})
export class MaterialModule {
}
