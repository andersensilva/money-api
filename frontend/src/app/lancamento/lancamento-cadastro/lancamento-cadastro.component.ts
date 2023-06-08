import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { Lancamento } from 'src/app/core/model';




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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  tipos=[
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ]

  categorias: any [] = [];

  pessoas: any [] = [];
  lancamento = new Lancamento()

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if(codigoLancamento){
      this.buscarPorCodigo()
    }
    this.carregaCategorias()
    this.carregarPessoas()
  }

  get editado() {
    return Boolean(this.lancamento.codigo)
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
        this.pessoas = pessoas.map((p: Pessoas) => ({label: p.nome, value: p.codigo}))
      }).catch(error => this.errorHandler.handle(error))
  }

  salvar(lancamentoForm: NgForm) {
    if (this.editado) {
      this.atualizarLancamento(lancamentoForm);
    } else {
      this.adicionarLancamento(lancamentoForm);
    }
  }

  adicionarLancamento(lancamentoForm: NgForm){
    this.LancamentoService.adicionar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lançamento adicionado com sucesso!' });
        // lancamentoForm.reset();
        // this.lancamento = new Lancamento
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
      }).catch(error => this.errorHandler.handle(error))
  }

  buscarPorCodigo(){
    this.LancamentoService.edit(this.route.snapshot.params['codigo'])
      .then(lancamentos => {
        this.lancamento = lancamentos as Lancamento

      })
  }

  atualizarLancamento(lancamentoForm: NgForm){
    this.LancamentoService.atualiza(this.lancamento)
    .then(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lançamento editado com sucesso!' });
      // lancamentoForm.reset();
      // this.lancamento = new Lancamento
      this.router.navigate(['/lancamentos'])
    }).catch(error => this.errorHandler.handle(error))
  }

  novo(lancamentoForm: NgForm){
    lancamentoForm.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamentos/new'])
  }
}
