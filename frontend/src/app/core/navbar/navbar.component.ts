import { Component, OnInit, ErrorHandler } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  usuarioLogado: string = ''
  exibindoMenu = false;

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  logout(){
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login'])
      }).catch(error => this.errorHandler.handle(error))
  }

}
