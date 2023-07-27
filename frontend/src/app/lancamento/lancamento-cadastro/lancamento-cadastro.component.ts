import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { Lancamento } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';




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
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  tipos=[
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ]

  categorias: any [] = [];

  pessoas: any [] = [];
  //lancamento = new Lancamento();
  formulario!: FormGroup

  ngOnInit() {
    this.title.setTitle('Novo lançamento');
    this.configurarFormulario()
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if(codigoLancamento){
      this.buscarPorCodigo()
    }
    this.carregaCategorias()
    this.carregarPessoas()
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [null, Validators.required],
      descricao: [null, [this.validarRequerido, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: [],
      }),
      categoria: this.formBuilder.group({
        codigo:[null, Validators.required],
        nome: []
      }),
      observacao: []
    })
  }

  validarRequerido(input: FormControl){
    return(input.value ? null : {requerido: true})
  }

  validarTamanhoMinimo(valor: number){
    return(input: FormControl) =>{
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo:{tamanho: valor} }
    }
  }

  get editado() {
    return Boolean(this.formulario.get('codigo')?.value)
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

  salvar() {
    if (this.editado) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento(){
    this.LancamentoService.adicionar(this.formulario.value)
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
        //this.lancamento = lancamentos as Lancamento
        this.formulario.patchValue(lancamentos)
        this.atualizaTitle();
      })
  }

  atualizarLancamento(){
    this.LancamentoService.atualiza(this.formulario.value)
    .then(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lançamento editado com sucesso!' });
      // lancamentoForm.reset();
      // this.lancamento = new Lancamento
      this.router.navigate(['/lancamentos'])
      this.atualizaTitle();
    }).catch(error => this.errorHandler.handle(error))
  }

  novo(){
    this.formulario.reset();
    setTimeout(() => {
      this.formulario.patchValue(new Lancamento())
    }, 1);

    this.router.navigate(['/lancamentos/new'])
  }

  atualizaTitle(){
    this.title.setTitle(`Ediçao de lancamento: ${this.formulario.get('descricao')?.value}`);
  }
}
