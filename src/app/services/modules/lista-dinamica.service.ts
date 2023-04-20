import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ListaDinamicaService {

  // Nombres Listas
  private apiGetNombresListasFull = this.api.getBaseUrl + "listadinamica/getNombresListasFull";
  private apiGetNombresListas = this.api.getBaseUrl + "listadinamica/getNombresListas";
  private apiCreateNombresListas = this.api.getBaseUrl + "listadinamica/crearNombresListas";
  private apiUpdateNombresLitas = this.api.getBaseUrl + "listadinamica/actualizarNombresListas";

  // Listas Dinamicas
  private apiGetListasDinamicasFull = this.api.getBaseUrl + "listadinamica/getListasDinamicasFull";
  private apiGetListasDinamicas = this.api.getBaseUrl + "listadinamica/getListasDinamicas";
  private apiCreateListasDinamicas = this.api.getBaseUrl + "listadinamica/crearListasDinamicas";
  private apiUpdateListasDinamicas = this.api.getBaseUrl + "listadinamica/actualizarListasDinamicas";

  constructor(private http: HttpClient, private api: ApiService) { }

  // Nombres Listas

  public getNombresListasFull(): Observable<any> {
    return this.http.get<any>(this.apiGetNombresListasFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getNombresListas(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetNombresListas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createNombresListas(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateNombresListas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateNombresListas(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateNombresLitas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Listas Dinamicas

  public getListasDinamicasFull(): Observable<any> {
    return this.http.get<any>(this.apiGetListasDinamicasFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getListasDinamicas(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetListasDinamicas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createListasDinamicas(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateListasDinamicas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateListasDinamicas(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateListasDinamicas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
