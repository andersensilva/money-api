import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit{

  constructor(
    private errorHandler: ErrorHandlerService,
    private PessoasService: PessoasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  get editado() {
    return Boolean(this.pessoa.codigo)
  }

  ngOnInit(): void {
    this.title.setTitle("Nova Pessoa")
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if(codigoPessoa){
      this.buscarPorCodigo()
    }
  }

  pessoa = new Pessoa()

  salvar(pessoaForm: NgForm){
    if (this.editado) {
      this.atualizarLancamento(pessoaForm);
    } else {
      this.adicionandoLancamento(pessoaForm)
    }
  }

  adicionandoLancamento(pessoaForm: NgForm){
    this.PessoasService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Pessoa adicionado com sucesso!' });
        pessoaForm.reset();
        this.pessoa = new Pessoa
      }).catch(error => this.errorHandler.handle(error))
  }

  atualizarLancamento(pessoaForm: NgForm){
    this.PessoasService.atualiza(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Pessoa editado com sucesso!' });
      this.router.navigate(['/pessoas'])
      this.atualizaTitle()
    }).catch(error => this.errorHandler.handle(error))
  }

  buscarPorCodigo(){
    this.PessoasService.edit(this.route.snapshot.params['codigo'])
      .then(pessoa => {
        this.pessoa = pessoa as Pessoa
        this.atualizaTitle()
      })
  }

  atualizaTitle(){
    this.title.setTitle(`Ediçao de pessoa: ${this.pessoa.nome}`);
  }
}
