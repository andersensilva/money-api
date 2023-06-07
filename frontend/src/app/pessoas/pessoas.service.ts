import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


export class PessoasFiltro {
  nome: String = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

  pessoasUrl = 'http://localhost:8082/pessoas'

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    let params = new HttpParams()
    console.log(filtro)
    params = params.set('page', filtro.pagina)

    params = params.set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYxMDY0OTEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJMSFBMTnpxOVR4VEJJQ0F1MUpMS2NYZkpkRUUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.TU_aNyN0sU2wq_jL1zc26UKWwca5V375j2aKDgT3dZo');

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }
    console.log(params)
    return firstValueFrom(
      this.http.get(`${this.pessoasUrl}`, { headers, params })
    ).then((response: any) => {
      console.log(response)
      const responseJson = response['content'];
      const lancamentos = responseJson;

      const resultado = {
        lancamentos,
        total: response.totalElements
      }

      return resultado
    });
   }
}
