import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private apiGetEspecialidadesFull = this.api.getBaseUrl + "especialidad/getEspecialidadesFull";
  private apiGetEspecialidades = this.api.getBaseUrl + "especialidad/getEspecialidades";
  private apiCreateEspecialidades = this.api.getBaseUrl + "especialidad/crearEspecialidades";
  private apiUpdateEspecialidades = this.api.getBaseUrl + "especialidad/actualizarEspecialidades";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getEspecialidadesFull(): Observable<any> {
    return this.http.get<any>(this.apiGetEspecialidadesFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getEspecialidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetEspecialidades, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createEspecialidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateEspecialidades, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateEspecialidades(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateEspecialidades, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
