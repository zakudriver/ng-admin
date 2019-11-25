import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from './components/menu/menu.module';
import { VimModule } from './components/vim/vim.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, MenuModule, VimModule],
  exports: [RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, MenuModule, VimModule]
})
export class SharedModule {}
