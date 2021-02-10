import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageContainerComponent } from './containers/main-page-container/main-page-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: 'home',
    component: MainPageContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
