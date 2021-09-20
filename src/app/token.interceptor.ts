import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // distribui o token jwt na aplicação que está guarada em localStorege - q foi configurada em loginComponent 


  //localStorage - é o local no navegador onde ficam salvas as variaveis até fechar o navegador 
  //SessionStorage - é o local no navegador onde ficam salvas as variaveis até fechar a aba  

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token'); // obtem o item pela chave q  está em loginComponent
    
    const url = request.url;

    if( tokenString && !url.endsWith('/oauth/token') ){
      const token = JSON.parse(tokenString); // converte string em json
      const jwt = token.access_token;
      request = request.clone({ // faz uma copia do header 
        setHeaders : {
          Authorization: 'Bearer ' + jwt
        }
      })
    }

    return next.handle(request);
  }
}
