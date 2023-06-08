import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toast: ToastModule,
    private MessageService: MessageService
    ) { }

  handle(errorResponse: any){
    let msg: string

    if( typeof errorResponse === 'string' ){
      msg = errorResponse;
    }else if (errorResponse.status == 404){
      msg = errorResponse.error[0].mensagemUsuario
    }else if (errorResponse.status == 400){
        msg = errorResponse.error[0].mensagemUsuario
    }else{
      msg = 'Erro ao processar serviço remoto. Tente novamente'
      console.error(errorResponse)
    }
    this.MessageService.add({ severity: 'error', summary: 'Error!', detail: msg });

  }
}
