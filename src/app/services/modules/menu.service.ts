import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiGetMenu = this.api.getBaseUrl + "menu/getMenus";
  private apiCreateMenu = this.api.getBaseUrl + "menu/crearMenus";
  private apiUpdateMenu = this.api.getBaseUrl + "menu/actualizarMenus";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getMenus(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetMenu, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createMenus(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateMenu, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateMenus(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateMenu, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
