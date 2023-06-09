import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';


export class PessoasFiltro {
  nome: String = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

  pessoasUrl : string

  constructor(
    private http: HttpClient
    ) {
      this.pessoasUrl = `${environment.apiUrl}/pessoas`
    }


  pesquisar(filtro: any): Promise<any> {
    let params = new HttpParams()
    params = params.set('page', filtro.pagina)

    params = params.set('size', filtro.itensPorPagina)

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return firstValueFrom(
      this.http.get(`${this.pessoasUrl}`, { params })
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
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, )
      .toPromise()
      .then(() => null);
   }

   mudarStatus(codigo: number, ativo: boolean): Promise<void>{
    const headers = new HttpHeaders()
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
    return this.http.get(`${this.pessoasUrl}/listar`)
      .toPromise()
      .then(response => response)

   }

   adicionar(pessoa: Pessoa): Promise<any> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl,
        JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response);
  }

  edit(codigo: number): Promise<any>{
    return firstValueFrom(
      this.http.get(`${this.pessoasUrl}/${codigo}`)
    ).then(response => {
      const pessoa = response as Pessoa

      return pessoa
    })
  }

  atualiza(pessoa: Pessoa): Promise<any>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response);
  }


}
