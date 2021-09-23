import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiGetPerfiles = this.api.getBaseUrl + "perfil/getPerfiles";
  private apiGetPerfilesFull = this.api.getBaseUrl + "perfil/getPerfilesFull";
  private apiCreatePerfiles = this.api.getBaseUrl + "perfil/crearPerfiles";
  private apiUpdatePerfiles = this.api.getBaseUrl + "perfil/actualizarPerfiles";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getPerfiles(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetPerfiles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getPerfilesFull(): Observable<any> {
    return this.http.get<any>(this.apiGetPerfilesFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createPerfiles(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreatePerfiles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updatePerfiles(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdatePerfiles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
