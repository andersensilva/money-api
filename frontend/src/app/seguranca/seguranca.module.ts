import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AuthGuard } from './auth.guard';
import { MoneyHttpInterceptor } from './money-http';
import { environment } from 'src/environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),
  ],
  providers: [
    JwtHelperService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MoneyHttpInterceptor,
    //   multi: true
    // },
    // AuthGuard
  ]
})
export class SegurancaModule { }
