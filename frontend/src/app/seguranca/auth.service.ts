import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8082/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.carregarToken()
    }

  login(usuario: string, senha: string): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', `Basic YW5ndWxhcjpAbmd1bEByMA==`)
    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`

    console.log(headers)
    console.log(body)
    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then((response: any )=> {
        console.log(response);
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        console.log(response)
        if(response.status === 400){
          const responseJson = response.error.error
          console.log(responseJson)
          if(responseJson === 'invalid_grant'){
            return Promise.reject('Usuario ou senha inválida')
          }
        }
        return Promise.reject(response)
      })
  }

  private armazenarToken(token: string){
    this.jwtPayload = this.jwtHelper.decodeToken(token)
    localStorage.setItem('token', token)
  }

  private carregarToken(){
    const token = localStorage.getItem('token')

    if(token){
      this.armazenarToken(token)
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao)
  }

  obterNovoAccessToken(): Promise<any> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = 'grant_type=refresh_token';
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((resposta: any) => {
        this.armazenarToken(resposta['access_token']);
        console.log('Novo access token criado.');
        return Promise.resolve(null);
      }).catch(resposta => {
        console.log('Erro ao renovar token.', resposta);
        return Promise.resolve(null);
      })
   }

   isAccessTokenInvalido() {
     const token = localStorage.getItem('token')

     return !token || this.jwtHelper.isTokenExpired(token)
   }

   temQualQuerPermissao(roles: any) {
    for(const role of roles) {
      if(this.temPermissao(role)) {
        return true
      }
    }
    return false
   }


}
