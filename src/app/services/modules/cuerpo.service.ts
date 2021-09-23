import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CuerpoService {

  // Cuerpos
  private apiGetCuerposFull = this.api.getBaseUrl + "cuerpo/getCuerposFull";
  private apiGetCuerpos = this.api.getBaseUrl + "cuerpo/getCuerpos";
  private apiCreateCuerpos = this.api.getBaseUrl + "cuerpo/crearCuerpos";
  private apiUpdateCuerpos = this.api.getBaseUrl + "cuerpo/actualizarCuerpos";

  constructor(private http: HttpClient, private api: ApiService) { }

  // Cuerpos
  public getCuerposFull(): Observable<any> {
    return this.http.get<any>(this.apiGetCuerposFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getCuerpos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetCuerpos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createCuerpos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateCuerpos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateCuerpos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateCuerpos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
