import { LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { Component, OnInit } from '@angular/core';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { Lancamento } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

export interface Categoria {
  codigo: number,
  nome: string
  //outros atributos
}

export interface Pessoas {
  codigo: number,
  nome: string
  //outros atributos
}


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriasService: CategoriasService,
    private errorHandler: ErrorHandlerService,
    private PessoasService: PessoasService,
    private LancamentoService: LancamentoService,
    private messageService: MessageService,
  ) { }

  tipos=[
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ]

  categorias: any [] = [];

  pessoas: any [] = [];
  lancamento = new Lancamento()



  ngOnInit() {
    this.carregaCategorias()
    this.carregarPessoas()
  }

  carregaCategorias(){
    return this.categoriasService.listarCategorias()
      .then(categorias => {
        this.categorias = categorias.map((c: Categoria) =>  ({ label: c.nome, value: c.codigo}));
      }).catch(error => this.errorHandler.handle(error))
  }

  carregarPessoas(){
    return this.PessoasService.listarPessoas()
      .then(pessoas => {
        console.log(pessoas)
        this.pessoas = pessoas.map((p: Pessoas) => ({label: p.nome, value: p.codigo}))
      }).catch(error => this.errorHandler.handle(error))
  }

  salvar(lancamentoForm: NgForm){
    this.LancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lançamento adicionado com sucesso!' });
        lancamentoForm.reset();
        this.lancamento = new Lancamento
      }).catch(error => this.errorHandler.handle(error))
  }

}
