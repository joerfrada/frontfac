import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

declare var swal:any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseurl = "http://localhost/apiplan/api/";
  private baseurl = "https://plancarrera.fac.mil.co/apiplan/api/";

  constructor() { }

  public getHttpOptions(tipo = 'l'): any {
    if (tipo == 'l') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf8',
          'Data-Type': 'json'
        })
      };
    }
    else if (tipo == 'g') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Data-Type': 'json',
          // 'Accept': 'json',
          // 'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
        })
      };
    }
    else if (tipo == 'b') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf8',
          'Data-Type': 'json'
        }),
        responseType: 'blob' as 'json'
      };
    }
  }

  get getBaseUrl() {
    return this.baseurl;
  }

  /* Error Exceptions */
  public errorHandle(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.Message;
      swal({
        type: 'error',
        text: errorMessage
      });
    }
    else {
      if (error.status === 401) {
        errorMessage = "Su sesión ha expirado. Intente conectarse nuevamente.";
        swal({
          title: 'ERROR AUTENTICACIÓN',
          type: 'error',
          text: errorMessage
        }).then((result: any) => {
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/';
          }, 500);
        });
      }
      else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        swal({
          title: 'ERROR',
          type: 'error',
          text: errorMessage
        });
      }
    }

    return throwError(errorMessage);
  }

  public ProcesarRespuesta(request: any) {
    if (request != undefined && request.tipo != 0 && request.tipo != -1) {
      swal({
        title: 'ERROR EN EL SISTEMA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'error'
      })
    }
    if (request != undefined && request.tipo == -1) {
      swal({
        title: 'ADVERTENCIA',
        text: request.mensaje,
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'warning'
      })
    }
    if (request != undefined && request.tipo == -1 && request.codigo == 2) {
      swal({
        title: 'ADVERTENCIA',
        type: 'error',
        text: request.mensaje
      }).then((result: any) => {
        setTimeout(() => {
          localStorage.clear();
          window.location.href = 'https://plancarrera.fac.mil.co/apiplan/logout';
        }, 500);
      });
    }

    return request;
  }
}
