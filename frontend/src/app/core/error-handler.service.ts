import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { NotAuthenticatedError } from '../seguranca/money-http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toast: ToastModule,
    private MessageService: MessageService,
    private router: Router
    ) { }

  handle(errorResponse: any){
    let msg: string

    console.log(errorResponse)
    if( typeof errorResponse === 'string' ){
      msg = errorResponse;
    }else if (errorResponse.status == 404){
      msg = errorResponse.error[0].mensagemUsuario
    }else if (errorResponse.status == 400){
        msg = errorResponse.error[0].mensagemUsuario
    }else if (errorResponse.status == 403){
      msg = 'Você não tem permissão para executar essa ação'
    }else if(errorResponse instanceof NotAuthenticatedError){
      msg = 'Sua sessão expirou'
      this.router.navigate(['/login']);
    }else{
      msg = 'Erro ao processar serviço remoto. Tente novamente'
      console.error(errorResponse)
    }
    this.MessageService.add({ severity: 'error', summary: 'Error!', detail: msg });

  }
}
