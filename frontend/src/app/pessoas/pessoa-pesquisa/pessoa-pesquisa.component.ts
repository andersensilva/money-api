import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { PessoasFiltro } from '../pessoas.service';
import { LazyLoadEvent } from 'primeng/api';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoasFiltro();
  pessoas:any [] = [];

  constructor(private PessoasService: PessoasService){}

  ngOnInit() {
    this.pesquisar()
   }

   pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.PessoasService.pesquisar(this.filtro)
      .then((resultado) => {
        console.log(resultado)
        this.totalRegistros = resultado.total
        this.pessoas = resultado.lancamentos;
      })

  };

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
