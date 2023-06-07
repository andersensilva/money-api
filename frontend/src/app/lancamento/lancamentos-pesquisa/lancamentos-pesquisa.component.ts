import { LazyLoadEvent } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any [] = [];
  @ViewChild('tabela') grid:any;



  constructor(private LancamentoService: LancamentoService){}

  ngOnInit() {
    //this.pesquisar()
  }



  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.LancamentoService.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total
        this.lancamentos = resultado.lancamentos;
      })

  };

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any){
    this.LancamentoService.excluir(lancamento.codigo)
      .then(() => {
       this.grid.reset()
      })
  }


}
