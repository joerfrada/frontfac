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
  private apiGetCargosId = this.api.getBaseUrl + "cargo/getCargosId";
  private apiGetCargosFull = this.api.getBaseUrl + "cargo/getCargosFull";
  private apiCreateCargos = this.api.getBaseUrl + "cargo/crearCargos";
  private apiUpdateCargos = this.api.getBaseUrl + "cargo/actualizarCargos";
  private apiGetDetalleCargos = this.api.getBaseUrl + "cargo/getDetalleCargos";
  private apiGetListasNiveles = this.api.getBaseUrl + "cargo/getListasNiveles";

  // Cargos Grados
  private apiGetCargosGrados = this.api.getBaseUrl + "cargo/getCargosGradosByCargoId";
  private apiCreateCargosGrados = this.api.getBaseUrl + "cargo/crearCargosGrados";
  private apiUpdateCargosGrados = this.api.getBaseUrl + "cargo/actualizarCargosGrados";
  private apiDeleteCargosGradosById = this.api.getBaseUrl + "cargo/eliminarCargosGradosById";

  // Cargos Configuracion
  private apiGetCargosConfiguracionId = this.api.getBaseUrl + "cargo/getCargosConfiguracionById";
  private apiGetCargosConfiguracion = this.api.getBaseUrl + "cargo/getCargosConfiguracionByCargoGradoId";
  private apiCreateCargosConfiguracion = this.api.getBaseUrl + "cargo/crearCargosConfiguracion";
  private apiUpdateCargosConfiguracion = this.api.getBaseUrl + "cargo/actualizarCargosConfiguracion";

  // Cargos Experiencias
  private apiGetCargosExperiencias = this.api.getBaseUrl + "cargo/getCargosExperienciasById";
  private apiCreateCargosExperiencias = this.api.getBaseUrl + "cargo/crearCargosExperiencias";
  private apiUpdateCargosExperiencias = this.api.getBaseUrl + "cargo/actualizarCargosExperiencias";
  private apiDeleteCargosExperienciasId = this.api.getBaseUrl + "cargo/eliminarCargosExperienciasId";

  // Ubicacion de Cargos
  private apiGetUbicacionCargos = this.api.getBaseUrl + "cargo/getUbicacionCargosId";
  private apiCreateUbicacionCargos = this.api.getBaseUrl + "cargo/crearUbicacionCargos";
  private apiUpdateUbicacionCargos = this.api.getBaseUrl + "cargo/actualizarUbicacionCargos";
  private apiDeleteUbicacionCargosId = this.api.getBaseUrl + "cargo/eliminarUbicacionCargosId";

  // Historial Cuerpos
  private apiCreateHistorialCuerpos = this.api.getBaseUrl + "cargo/crearHistorialCuerpos";
  private apiUpdateHistorialCuerpos = this.api.getBaseUrl + "cargo/actualizarHistorialCuerpos";
  private apiGetHistorialCuerpos = this.api.getBaseUrl + "cargo/getHistorialCuerposByCargoGrado";

  // Historial Especialidades
  private apiCreateHistorialEspecialidades = this.api.getBaseUrl + "cargo/crearHistorialEspecialidades";
  private apiUpdateHistorialEspecialidades = this.api.getBaseUrl + "cargo/actualizarHistorialEspecialidades";
  private apiGetHistorialEspecialidades = this.api.getBaseUrl + "cargo/getHistorialEspecialidadesByCargoGrado";

  // Historial Areas
  private apiCreateHistorialAreas = this.api.getBaseUrl + "cargo/crearHistorialAreas";
  private apiUpdateHistorialAreas = this.api.getBaseUrl + "cargo/actualizarHistorialAreas";
  private apiGetHistorialAreas = this.api.getBaseUrl + "cargo/getHistorialAreasByCargoGrado";

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

  public getCargosId(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargosId, JSON.stringify(data), this.api.getHttpOptions('g'))
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

  public getDetalleCargos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetDetalleCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getListasNiveles(): Observable<any> {
    return this.http.get<any>(this.apiGetListasNiveles, this.api.getHttpOptions('g'))
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

  public updateCargosGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateCargosGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public deleteCargosGradosById(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteCargosGradosById, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Cargos Configuracion
  public getCargosConfiguracionId(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargosConfiguracionId, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

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

  // Cargos Experiencias
  public getCargosExperiencias(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCargosExperiencias, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createCargosExperiencias(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateCargosExperiencias, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateCargosExperiencias(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateCargosExperiencias, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public deleteCargosExperienciasId(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteCargosExperienciasId, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getUbicacionCargosId(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetUbicacionCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createUbicacionCargos(data: any) : Observable<any> {
    return this.http.post<any>(this.apiCreateUbicacionCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateUbicacionCargos(data: any) : Observable<any> {
    return this.http.post<any>(this.apiUpdateUbicacionCargos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public deleteUbicacionCargosId(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteUbicacionCargosId, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Historial Cuerpos
  public createHistorialCuerpos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateHistorialCuerpos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateHistorialCuerpos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateHistorialCuerpos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getHistorialCuerpos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetHistorialCuerpos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Historial Especialidades
  public createHistorialEspecialidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateHistorialEspecialidades, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateHistorialEspecialidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateHistorialEspecialidades, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getHistorialEspecialidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetHistorialEspecialidades, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  // Historial Areas
  public createHistorialAreas(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateHistorialAreas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateHistorialAreas(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateHistorialAreas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getHistorialAreas(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetHistorialAreas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
