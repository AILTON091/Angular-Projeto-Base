import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean

  constructor() { }

  onSubmit(){
    console.log(`User: ${this.username}, ${this.password}`)
  }

  preparCadastrando(event:any){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelar(){
    this.cadastrando = false;
  }

}
