import { PessoasService } from './../pessoas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoasFiltro } from '../pessoas.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoasFiltro();
  pessoas:any [] = [];
  @ViewChild('tabela') grid:any;

  constructor(
    private PessoasService: PessoasService,
    private MessageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private ErrorHandler: ErrorHandlerService,
    private title: Title
    ){}

  ngOnInit() {
    this.title.setTitle("Pesquisa de pessoas")
    this.pesquisar()
   }

   pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.PessoasService.pesquisar(this.filtro)
      .then((resultado) => {
        console.log(resultado)
        this.totalRegistros = resultado.total
        this.pessoas = resultado.pessoas;
      })

  };

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmExclusao(pessoa: any){
    this.PessoasService.excluir(pessoa.codigo)
    .then(() => {
      if(this.grid.first === 0){
        this.pesquisar()
      }else{
        this.grid.reset();
      }
      this.MessageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'registro excluido com sucesso' });
    }).catch((error) => this.ErrorHandler.handle(error))
  }

  excluir(pessoa: any){
    this.ConfirmationService.confirm({
      message: 'Tem certeja que deseja excluir?',
      accept: () => {
        this.confirmExclusao(pessoa)
      }
    });

  }

  mudarStatus(pessoa: any){
    this.PessoasService.mudarStatus(pessoa.codigo, pessoa.ativo)
      .then(() =>{
        this.MessageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Status Alterado com sucesso' });
        this.pesquisar(this.filtro.pagina)
      })
  }
}
