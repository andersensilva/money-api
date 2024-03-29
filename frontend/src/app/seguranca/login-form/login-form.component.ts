import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ){ }

  login(usuario: string, senha: string){
    this.auth.login(usuario,senha)
    .then(() =>{
      this.router.navigate(['/lancamentos'])
    })
    .catch(error =>{
      this.errorHandler.handle(error)
    })
  }
}
