import { NgModule } from '@angular/core';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {path: '', component: LancamentosPesquisaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }},
  {path: 'new', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }},
  {path: ':codigo', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentoRoutingModule { }
