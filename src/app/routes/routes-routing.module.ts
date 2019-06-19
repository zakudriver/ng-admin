import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@app/routes/not-found/not-found.component';
import { LayoutMainComponent } from '@app/layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
  },
  {
    path        : 'sign',
    loadChildren: './sign/sign.module#SignModule',
  },
  {
    path     : '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutesRoutingModule {
}
