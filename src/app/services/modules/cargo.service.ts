import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  // Cargos
  private apiGetCargos = this.api.getBaseUrl + "cargo/getCargos";
  private apiGetCargosFull = this.api.getBaseUrl + "cargo/getCargosFull";
  private apiCreateCargos = this.api.getBaseUrl + "cargo/crearCargos";
  private apiUpdateCargos = this.api.getBaseUrl + "cargo/actualizarCargos";

  // Rutas y Requisitos
  private apiGetRutasRequisitos = this.api.getBaseUrl + "cargo/getRutasRequisitos";
  private apiCreateRutasRequisitos = this.api.getBaseUrl + "cargo/crearRutasRequisitos";
  private apiUpdateRutasRequisitos = this.api.getBaseUrl + "cargo/actualizarRutasRequisitos";

  // Educaciones y Conocimientos
  private apiGetEducaciones = this.api.getBaseUrl + "cargo/getEducaciones";
  private apiCreateEducaciones = this.api.getBaseUrl + "cargo/crearEducaciones";
  private apiUpdateEducaciones = this.api.getBaseUrl + "cargo/actualizarEducaciones";

  constructor(private http: HttpClient, private api: ApiService) { }

  // Cargo
  public getCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getCargosFull(): Observable<any> {
    return this.http.post<any>(this.apiGetCargosFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Rutas y Requisitos
  public getRutasRequisitos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRutasRequisitos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createRutasRequisitos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateRutasRequisitos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateRutasRequisitos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateRutasRequisitos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Educaciones y Conocimientos
  public getEducaciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetEducaciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createEducaciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateEducaciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateEducaciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateEducaciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
