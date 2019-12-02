import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@app/routes/not-found/not-found.component';
import { LayoutComponent } from '@app/layout/layout.component';
import { AuthGuard } from '@app/core/auth/auth.guard';

const main: Routes = [
  {
    path: 'article',
    loadChildren: () => import('@app/routes/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('@app/routes/editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('@app/routes/setting/setting.module').then(m => m.SettingModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: main
  },
  {
    path: 'sign',
    loadChildren: () => import('@app/routes/sign/sign.module').then(m => m.SignModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
