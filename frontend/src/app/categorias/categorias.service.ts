import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService implements OnInit{

  categoriasUrl = 'http://localhost:8082/categorias'

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  listarCategorias(): Promise<any>{
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response)
  }
}
