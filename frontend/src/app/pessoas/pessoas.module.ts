import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { SharedModule } from '../shared/shared.module';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
  ],
  exports:[
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    InputMaskModule,

    SharedModule,
  ]
})
export class PessoasModule { }
