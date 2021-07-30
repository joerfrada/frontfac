import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/auth/login.service';

declare var swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: any = "";
  password: any = "";

  loader = false;

  constructor(private loginService: LoginService, private api: ApiService) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login({ "usuario": this.usuario, "password": this.password}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo === 0) {
        // console.log(response.user.result);
        localStorage.setItem('currentUser', JSON.stringify(response.user.result));
        localStorage.setItem('auth-token', response.token);
        this.loader = true;
        setTimeout(() => {
          location.href = "/fac/home";
        }, 3000);
      }
      else {
        swal({
          title: 'ERROR',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'error'
        })
      }
    });
  }

}
