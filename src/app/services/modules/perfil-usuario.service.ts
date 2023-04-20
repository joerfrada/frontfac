import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  private apiGetPerfilesUsuarios = this.api.getBaseUrl + "perfilusuario/getPerfilesUsuarios";
  private apiCreatePerfilesUsuarios = this.api.getBaseUrl + "perfilusuario/crearPerfilesUsuarios";
  private apiUpdatePerfilesUsuarios = this.api.getBaseUrl + "perfilusuario/actualizarPerfilesUsuarios";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getPerfilesUsuarios(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetPerfilesUsuarios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createPerfilesUsuarios(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreatePerfilesUsuarios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updatePerfilesUsuarios(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdatePerfilesUsuarios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
