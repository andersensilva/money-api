import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';


import { NavbarComponent } from './core/navbar/navbar.component';
import { LancamentoModule } from './lancamento/lancamento.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { LancamentoService } from './lancamento/lancamento.service';
import { PessoasService } from './pessoas/pessoas.service';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LancamentoModule,
    PessoasModule,

    CoreModule
  ],
  providers: [LancamentoService, PessoasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
