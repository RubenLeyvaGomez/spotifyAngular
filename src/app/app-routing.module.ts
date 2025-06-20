import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { SessionGuard } from '@core/guards/session.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren:() =>import('../app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',  //SE DEBE PROTEGER ESTAR RUTA
    component: HomePageComponent,
    loadChildren: () =>import('../app/modules/home/home.module').then(m => m.HomeModule),
    canActivate:[SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
