import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { format } from  'date-fns';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: String = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8082/lancamento'

  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYyMDMxMTEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIwZkxTMndiZTcxRjRWano1bFBlWUN1UkRXT3ciLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.x_11OCZAM8dMBmJGPvJVyLZS8Z1KBVX3_ZDvdPWPXoo'

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    let params = new HttpParams()

    params = params.set('page', filtro.pagina)

    params = params.set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', `${this.token}`);

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', format(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', format(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }
    return firstValueFrom(
      this.http.get(`${this.lancamentoUrl}?resumo`, { headers, params })
    ).then((response: any) => {
      const responseJson = response['content'];
      const lancamentos = responseJson;

      const resultado = {
        lancamentos,
        total: response.totalElements
      }

      return resultado
    });
   }

   excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
   }

   adicionar(lancamento: Lancamento): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`)
    .append('Content-Type', 'application/json');

    return this.http.post(this.lancamentoUrl,
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response);
  }
}
