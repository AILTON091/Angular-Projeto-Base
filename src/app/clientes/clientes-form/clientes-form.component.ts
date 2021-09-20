import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes'
import { ClientesService } from '../../clientes.service'
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

 cliente: Cliente;
 success: boolean = false;
 erros: string[];
 id : number;

  constructor(
    private service : ClientesService,
    private router : Router,
    private activatedRoute : ActivatedRoute
    )  {
    this.cliente = new Cliente();
   }

  ngOnInit(): void {
     let params = this.activatedRoute.params
     .subscribe( params => {
       if (params && params['id'] ){
         this.service.getClienteById(params.id)
        .subscribe(
         response => {
          this.cliente = response,
          console.log(this.cliente)  
         },  
            errorResponse => this.cliente = new Cliente
          )}
      })
  }

  onSubmit(){
    if (this.id){
      this.service
        .atualizar(this.cliente)
        .subscribe( response => {
           this.success = true;
           this.erros = [];
        }, errosResponse => {
          this.erros = ['Erro ao atualizar o cliente.']
        })

    }else{
      this.service
        .salvar(this.cliente)
        .subscribe( response => {
          this.success = true;
          this.erros = [];
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.erros = errorResponse.error.erros;
        })
    }
  }

  voltarParaListagem() {
     this.router.navigate(['/clientes/lista'])
  }
}
