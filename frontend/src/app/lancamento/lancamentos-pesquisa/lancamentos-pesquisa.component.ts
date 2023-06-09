import { Component, OnInit, ViewChild} from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

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



  constructor(
    private LancamentoService: LancamentoService,
    private messageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private ErrorHandler: ErrorHandlerService,
    private title: Title,
    private auth: AuthService
    ){}



  ngOnInit() {
    this.title.setTitle("Pesquisa de lançamentos")
  }



  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.LancamentoService.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total
        this.lancamentos = resultado.lancamentos;
      }).catch((error) => this.ErrorHandler.handle(error))

  };

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmExclusao(lancamento: any){
    this.LancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if(this.grid.first === 0){
        this.pesquisar()
      }else{
        this.grid.reset();
      }
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'registro excluido com sucesso' });
    }).catch((error) => this.ErrorHandler.handle(error))
  }

  excluir(lancamento: any){
    this.ConfirmationService.confirm({
      message: 'Tem certeja que deseja excluir?',
      accept: () => {
        this.confirmExclusao(lancamento)
      }
    });

  }


}
