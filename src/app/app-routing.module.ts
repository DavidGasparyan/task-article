import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {authGuard} from "./guard/auth.guard";
import {SignupComponent} from "./signup/signup.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {adminGuard} from "./guard/admin.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'articles',
    loadChildren: () => import('./article-list/article-list.module').then(m => m.ArticleListModule),
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
