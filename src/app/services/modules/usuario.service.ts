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
  private apiGetUsuariosRolesById = this.api.getBaseUrl + "usuario/getUsuariosRolesById";
  private apiCreateUsuarioRol = this.api.getBaseUrl + "usuario/crearUsuarioRol";
  private apiUpdateUsuarioRol = this.api.getBaseUrl + "usuario/actualizarUsuarioRol";
  private apiGetRolPrivilegiosPantalla = this.api.getBaseUrl + "usuario/getRolPrivilegiosPantalla";
  private apiGetPermisosByUser = this.api.getBaseUrl + "usuario/getPermisosByUser";
  private apiDeleteUsuariosRolesId = this.api.getBaseUrl + "usuario/eliminarUsuariosRolesId";
  private apiGetRolesByUsuarioId = this.api.getBaseUrl + "usuario/getRolesByUsuarioId";

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

  public getUsuariosRolesById(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetUsuariosRolesById, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createUsuariosRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateUsuarioRol, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateUsuariosRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateUsuarioRol, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getRolPrivilegiosPantalla(): Observable<any> {
    return this.http.get<any>(this.apiGetRolPrivilegiosPantalla, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getPermisosByUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetPermisosByUser, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public deleteUsuariosRolesId(data: any): Observable<any> {
    return this.http.post<any>(this.apiDeleteUsuariosRolesId, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getRolesByUsuarioId(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRolesByUsuarioId, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
