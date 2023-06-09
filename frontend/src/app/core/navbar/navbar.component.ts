import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  usuarioLogado: string = ''
  exibindoMenu = false;

  constructor(
    private auth: AuthService
  ){}

  ngOnInit(): void {
    console.log(this.auth.jwtPayload?.nome)
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

}
