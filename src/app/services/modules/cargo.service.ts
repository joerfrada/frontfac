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

  // Cargos Grados
  private apiGetCargosGrados = this.api.getBaseUrl + "cargo/getCargosGradosByCargoId";
  private apiCreateCargosGrados = this.api.getBaseUrl + "cargo/crearCargosGrados";
  private apiUpdateCargosGrados = this.api.getBaseUrl + "cargo/actualizarCargosGrados";

  // Cargos Configuracion
  private apiGetCargosConfiguracion = this.api.getBaseUrl + "cargo/getCargosConfiguracionByCargoGradoId";
  private apiCreateCargosConfiguracion = this.api.getBaseUrl + "cargo/crearCargosConfiguracion";
  private apiUpdateCargosConfiguracion = this.api.getBaseUrl + "cargo/actualizarCargosConfiguracion";

  constructor(private http: HttpClient, private api: ApiService) { }

  // Cargo
  public getCargosFull(): Observable<any> {
    return this.http.get<any>(this.apiGetCargosFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
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

  // Cargos Grados
  public getCargosGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargosGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createCargosGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateCargosGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateteCargosGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateCargosGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Cargos Configuracion
  public getCargosConfiguracion(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargosConfiguracion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createCargosConfiguracion(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateCargosConfiguracion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateCargosConfiguracion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateCargosConfiguracion, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
