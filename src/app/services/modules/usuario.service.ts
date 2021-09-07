import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiGetUsuarios = this.api.getBaseUrl + "usuario/getUsuarios";
  private apiGetUsuariosFull = this.api.getBaseUrl + "usuario/getUsuariosFull";
  private apiCreateUsuarios = this.api.getBaseUrl + "usuario/crearUsuarios";
  private apiUpdateUsuarios = this.api.getBaseUrl + "usuario/actualizarUsuarios";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getUsuariosFull(): Observable<any> {
    return this.http.get<any>(this.apiGetUsuariosFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getUsuarios(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetUsuarios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createUsuarios(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateUsuarios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateUsuarios(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateUsuarios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
