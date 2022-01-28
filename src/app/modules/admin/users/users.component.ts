import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varUsuario: any = {
    usuario_id: 0,
    usuario: "",
    nombres: "",
    apellidos: "",
    num_identificacion: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  model = new Model();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  modal: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UsuarioService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varUsuario.usuario_creador = this.currentUser.usuario;
    this.model.varUsuario.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro: string = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.rol.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearUsuario() {
    this.model.varUsuario = {
      usuario_id: 0,
      usuario: "",
      nombres: "",
      apellidos: "",
      num_identificacion: 0,
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    };
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Usuario";
    this.model.tipo = 'C';

    this.clearUsuario();
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  getUsuarios() {
    let json = {
      filtro: 0
    }

    this.usuario.getUsuarios(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  editUsuario(dato: any) {
    this.modal = true;
    this.model.title = "Actualizar Usuario";
    this.model.tipo = 'U';

    this.model.varUsuario.usuario_id = dato.usuario_id;
    this.model.varUsuario.usuario = dato.usuario;
    this.model.varUsuario.nombres = dato.nombres;
    this.model.varUsuario.apellidos = dato.apellidos;
    this.model.varUsuario.num_identificacion = dato.num_identificacion;
    this.model.varUsuario.activo = (dato.activo == 'S') ? true : false;
  }

  saveUsuario() {
    this.usuario.createUsuarios(this.model.varUsuario).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Usuarios',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    });
  }

  updateUsuario() {
    this.usuario.updateUsuarios(this.model.varUsuario).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Usuarios',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    });
  }
}
