import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService implements OnInit{

  categoriasUrl = 'http://localhost:8082/categorias'

  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYyMDMxMTEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIwZkxTMndiZTcxRjRWano1bFBlWUN1UkRXT3ciLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.x_11OCZAM8dMBmJGPvJVyLZS8Z1KBVX3_ZDvdPWPXoo'

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  listarCategorias(): Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.get(`${this.categoriasUrl}`, {headers})
      .toPromise()
      .then(response => response)
  }
}
