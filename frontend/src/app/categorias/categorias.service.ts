import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService implements OnInit{

  categoriasUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`
   }

  ngOnInit() {
  }

  listarCategorias(): Promise<any>{
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response)
  }
}
