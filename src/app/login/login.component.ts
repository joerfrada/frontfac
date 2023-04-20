import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/auth/login.service';
import { Session } from '../models/session.model';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: any = "";
  password: any = "";
  titleLogin = "Iniciar sesión";

  loader = false;

  constructor(private loginService: LoginService, private api: ApiService) { }

  ngOnInit(): void {
    //this.login();
  }

  inputNext() {
    $('.inputp').focus();
  }

  login() {
    this.titleLogin = "Iniciando sesión... Espere";
    //this.usuario = "admin";
    //this.password = "demo";
    this.loginService.login({ usuario: this.usuario, password: this.password }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo === 0) {
        localStorage.setItem("currentUser", JSON.stringify(response.user.result));
        //localStorage.setItem("auth-token", response.token);
        this.loader = true;
        setTimeout(() => {
          location.href = "/fac/home";
        }, 1000);
      }
      else {
        swal({
          title: 'ERROR',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'error'
        }).then((result: any) => {
          if (result) {
            this.titleLogin = "Iniciar sesión";
            this.password = "";
          }
        });
      }
    });
  }

}
