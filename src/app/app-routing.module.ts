import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent  },
    {path: '', component: LayoutComponent, children: [
    { path:'home', component: HomeComponent, canActivate : [AuthGuard]}, // o canActivate - que retorna se o usuario está ou não autenticado e se a senha já expirou 
    { path: '', redirectTo: '/home', pathMatch: 'full'}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
