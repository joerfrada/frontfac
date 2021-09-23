import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  // Areas
  private apiGetAreas = this.api.getBaseUrl + "area/getAreas";
  private apiCreateAreas = this.api.getBaseUrl + "area/crearAreas";
  private apiUpdateAreas = this.api.getBaseUrl + "area/actualizarAreas";

  constructor(private http: HttpClient, private api: ApiService) { }

  // Areas
  public getAreas(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetAreas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createAreas(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateAreas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateAreas(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateAreas, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
