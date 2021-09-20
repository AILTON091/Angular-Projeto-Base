import { Injectable } from '@angular/core';
import { Cliente } from './clientes/clientes';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // toda essa requisicão precisa de autenticação "um cabeçaho Header"
  // essa configuração é feita em token.interceptor 

  apiURL = environment.apiURLBase + '/clientes-angular'

  constructor(private http : HttpClient) { 
  }

  salvar( cliente: Cliente ) : Observable<Cliente> {
     return this.http.post<Cliente>(`${this.apiURL}` , cliente ,)
  }
  
  atualizar( cliente: Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>((`${this.apiURL}/${cliente.id}`), cliente,)
 }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}`,)
  }
  
  getClienteById(id : number) : Observable<Cliente>{
    return this.http.get<any>(`${this.apiURL}/${id}`,)
  }

 

}
