import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RutaCarreraService {

  // Ruta Carrera
  private apiGetRutaCarrera = this.api.getBaseUrl + "rutacarrera/getRutaCarrera";
  private apiCreateRutaCarrera = this.api.getBaseUrl + "rutaCarrera/crearCarrera";
  private apiUpdateRutaCarrera = this.api.getBaseUrl + "rutaCarrera/actualizarCarrera";

  // Lineas de Cargo
  private apiGetLineasCargos = this.api.getBaseUrl + "rutacarrera/getLineasCargos";
  private apiCreateLineasCargos = this.api.getBaseUrl + "rutacarrera/crearLineasCargos";
  private apiUpdateLineasCargos = this.api.getBaseUrl + "rutacarrera/actualizarLineasCargos";

  constructor(private http: HttpClient, private api: ApiService) { }

  // Ruta Carrera
  public getRutaCarrera(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRutaCarrera, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createRutaCarrera(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateRutaCarrera, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateRutaCarrera(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateRutaCarrera, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Lineas de Cargo

  public getLineasCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetLineasCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createLineasCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateLineasCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateLineasCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateLineasCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
