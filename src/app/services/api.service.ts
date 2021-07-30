import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

declare var swal:any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Data-Type': 'json'
    })
  }

  private baseurl = "http://localhost:8000/api/";

  constructor() { }

  get getHttpOptions() {
    return this.httpOptions;
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
        errorMessage = "Su sesión ha exipirado. Intente conectarse nuevamente.";
        swal({
          title: 'ERROR AUTENTICACIÓN',
          type: 'error',
          text: errorMessage
        }).then((result: any) => {
          setTimeout(() => {
            //new LoginService().logout();
            window.location.href = '/login';
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

    return request;
  }
}
