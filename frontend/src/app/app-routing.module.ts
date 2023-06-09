import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamento/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado/nao-autorizado.component';


const routes: Routes = [
  {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
