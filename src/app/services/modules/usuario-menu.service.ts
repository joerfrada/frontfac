import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioMenuService {

  private apiGetUsuarioMenu = this.api.getBaseUrl + "usuariomenu/getUsuarioMenu";
  private apiCrudAsignarMenus = this.api.getBaseUrl + "usuariomenu/crudAsignarMenus";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getUsuarioMenu(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetUsuarioMenu, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public crudAsignarMenus(data: any): Observable<any> {
    return this.http.post<any>(this.apiCrudAsignarMenus, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
