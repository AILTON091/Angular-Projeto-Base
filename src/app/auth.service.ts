import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //npm install --save @auth0/angular-jwt
  // biblioteca para verificar o tempo de expiração do token jwt


  apiUrl: string = environment.apiURLBase + "/api/usuarios"
  tokenUrl : string = environment.apiURLBase + environment.obterTokenUrl
  clientId : string = environment.clientId;
  clientSecret : string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();
                                              
  constructor(
    private http: HttpClient
  ) { }

  //remoção do token do localStorage 
  encerrarSessao(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
     const token = this.obterToken();
     if (token ){
        const usuario =  this.jwtHelper.decodeToken(token).user_name
        return usuario;
     }
     return null;    
  }

  isAuthentated() : boolean{
    const token =  this.obterToken()
    if (token){
      const expired = this.jwtHelper.isTokenExpired(token) // função para verificar se token está expirado
      return !expired;
    }
    return false;
  }

  obterToken(){
     const tokenString = localStorage.getItem('access_token');
     if(tokenString){
       const token = JSON.parse(tokenString).access_token
       return token;
     }
     return null;
  }

  salvar(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.apiUrl,usuario);
  }

  tentarLogar(usarname: string, password:string) : Observable<any> {

    const parans = new HttpParams()
                          .set('username',usarname) // configuração feita no back feita no 
                          .set('password',password)
                          .set('grant_type','password');
    
    const headers = {
      'Authorization': 'Basic '+ btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }                      
                          
    return this.http.post(this.tokenUrl,parans,{ headers });
  }
}
