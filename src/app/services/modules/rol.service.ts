import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiGetRoles = this.api.getBaseUrl + "rol/getRoles";
  private apiGetRolesActivos = this.api.getBaseUrl + "rol/getRolesActivos";
  private apiCreateRoles = this.api.getBaseUrl + "rol/crearRoles";
  private apiUpdateRoles = this.api.getBaseUrl + "rol/actualizarRoles";
  private apiGetRolPrivilegiosById = this.api.getBaseUrl + "rol/getRolPrivilegiosById";
  private apiCreateRolPrivilegios = this.api.getBaseUrl + "rol/crearRolPrivilegios";
  private apiUpdateRolPrivilegios = this.api.getBaseUrl + "rol/actualizarRolPrivilegios";
  private apiDeleteRolPrivilegiosById = this.api.getBaseUrl + "rol/eliminarRolPrivilegiosById";
  private apiGetModulos = this.api.getBaseUrl + "rol/getModulos";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRoles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getRolesActivos() : Observable<any> {
    return this.http.get<any>(this.apiGetRolesActivos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateRoles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateRoles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getRolPrivilegiosById(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRolPrivilegiosById, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createRolPrivilegios(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateRolPrivilegios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateRolPrivilegios(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateRolPrivilegios, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public deleteRolPrivilegiosById(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteRolPrivilegiosById, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getModulos(): Observable<any> {
    return this.http.get<any>(this.apiGetModulos, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
