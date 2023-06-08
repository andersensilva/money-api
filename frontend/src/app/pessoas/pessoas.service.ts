import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Pessoa } from '../core/model';


export class PessoasFiltro {
  nome: String = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

  pessoasUrl = 'http://localhost:8082/pessoas'

  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYyMDMxMTEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIwZkxTMndiZTcxRjRWano1bFBlWUN1UkRXT3ciLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.x_11OCZAM8dMBmJGPvJVyLZS8Z1KBVX3_ZDvdPWPXoo'


  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    let params = new HttpParams()
    params = params.set('page', filtro.pagina)

    params = params.set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', `${this.token}`);

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return firstValueFrom(
      this.http.get(`${this.pessoasUrl}`, { headers, params })
    ).then((response: any) => {
      console.log(response)
      const responseJson = response['content'];
      const pessoas = responseJson;

      const resultado = {
        pessoas,
        total: response.totalElements
      }

      return resultado
    });
   }

   excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
   }

   mudarStatus(codigo: number, ativo: boolean): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`)
    .append('Content-Type', 'application/json');

    if(ativo == true){
      ativo = false
    }else{
      ativo = true
    }

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers})
      .toPromise()
      .then(() => null)

   }

   listarPessoas(): Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.get(`${this.pessoasUrl}/listar`, { headers })
      .toPromise()
      .then(response => response)

   }

   adicionar(pessoa: Pessoa): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`)
    .append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl,
        JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response);
  }


}
