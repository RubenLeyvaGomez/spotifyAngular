import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [ //LAS RUTAS QUE SE VAN A MANEJAR A PARTIR DE AUTH
  {
    path:'login',
    component: AuthPageComponent
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
