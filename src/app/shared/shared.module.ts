import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DEFAULT_GLOBAL_OPTIONS } from '@app/shared/modules/material/global.config';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [RouterModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [...DEFAULT_GLOBAL_OPTIONS]
})
export class SharedModule {}
