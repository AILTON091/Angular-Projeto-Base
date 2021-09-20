import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // faz o controle de rotas 
  // exemplo: se tiver autenticado vizualiza os dados, se não volta pra tela de login
  // configurar em  app-routing.module
  constructor( 
     private authService: AuthService,
     private router: Router
   ){}

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    const authenticated = this.authService.isAuthentated();
    
    if( authenticated){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}
