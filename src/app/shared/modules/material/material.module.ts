import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule, MatSnackBarModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports     : [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  exports     : [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
})
export class MaterialModule {
}
