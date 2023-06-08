import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  constructor(
    private errorHandler: ErrorHandlerService,
    private PessoasService: PessoasService,
    private messageService: MessageService,
  ) { }

  pessoa = new Pessoa()

  salvar(pessoaForm: NgForm){
    this.PessoasService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lançamento adicionado com sucesso!' });
        pessoaForm.reset();
        this.pessoa = new Pessoa
      }).catch(error => this.errorHandler.handle(error))
  }
}
