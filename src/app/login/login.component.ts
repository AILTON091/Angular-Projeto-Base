import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  msgSucesso : boolean;
  erros!: any;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  //localStorage - é o local no navegador onde ficam salvas as variaveis até fechar o navegador 
  //SessionStorage - é o local no navegador onde ficam salvas as variaveis até fechar a aba  


  onSubmit(){
    this.authService
          .tentarLogar(this.username,this.password)
          .subscribe( response => {
            
            const access_Token = JSON.stringify(response) // converte o objeto em string 
            localStorage.setItem('access_token',access_Token) // salva no localStorage a chave de acesso
            this.router.navigate(['/home'])
          }, erroResponse => {
             this.erros = ['Usuario e/ou senha incorreto(s).']
          })  
  }

  preparCadastrando(event:any){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelar(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username =this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe( res => {
        this.msgSucesso = true;
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
        this.cadastrando = false;
        this.username = '';
        this.password = '';
        this.erros = null;
      }, errorResponse => {
        this.msgSucesso = false;
        this.erros = errorResponse.error.campos;
      });

  }  
  
}

