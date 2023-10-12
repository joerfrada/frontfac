import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { PerfilUsuarioService } from '../../../services/modules/perfil-usuario.service';
import { PerfilService } from '../../../services/modules/perfil.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varPerfilUsuario: any = {
    perfil_usuario_id: 0,
    perfil_id: 0,
    usuario_id: 0,
    tipo_perfil_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };
}

@Component({
  selector: 'app-profiles-users',
  templateUrl: './profiles-users.component.html',
  styleUrls: ['./profiles-users.component.scss']
})
export class ProfilesUsersComponent implements OnInit {

  model = new Model();

  modal: any;

  varhistorial: any = [];
  varusuario: any = [];
  varperfil: any = [
    {
      perfil_id: 1,
      perfil: "Administrador"
    },
    {
      perfil_id: 2,
      perfil: "Joe Ronald Florez Rada"
    }
  ];
  
  vartipoperfil: any = [];

  currentUser: any;

  constructor(private router: Router,
              private api: ApiService, 
              private perfilUsuario: PerfilUsuarioService,
              private perfil: PerfilService,
              private usuario: UsuarioService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.model.varPerfilUsuario.usuario_creador = this.currentUser.usuario;
    this.model.varPerfilUsuario.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getPerfilesUsuarios();
    // this.getPerfilesFull();
    this.getUsuariosFull();
    this.getListas();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  clearPerfilUsuarios() {
    this.model.varPerfilUsuario = {
      perfil_usuario_id: 0,
      perfil_id: 0,
      usuario_id: 0,
      tipo_perfil_id: 0,
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    };
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Perfil-Usuario";
    this.model.tipo = 'C';

    this.clearPerfilUsuarios();
  }

  closeModal(bol: any) {
    this.modal = bol;
  }
  
  getPerfilesUsuarios() {
    let json = {
      filtro: 0
    }

    this.perfilUsuario.getPerfilesUsuarios(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    });
  }

  getPerfilesFull() {
    this.perfil.getPerfilesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varperfil = response.result;
      }
    });
  }

  getUsuariosFull() {
    this.usuario.getUsuariosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varusuario = response.result;
      }
    })
  }

  getListas() {
    let varlistas = JSON.parse(localStorage.getItem("listasDinamicasFull") as any);
    this.vartipoperfil = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_PERFIL');
    this.vartipoperfil.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
  }

  editPerfilUsuario(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Perfil-Usuario";

    this.model.varPerfilUsuario.perfil_usuario_id = data.perfil_usuario_id;
    this.model.varPerfilUsuario.perfil_id = data.perfil_id;
    this.model.varPerfilUsuario.usuario_id = data.usuario_id;
    this.model.varPerfilUsuario.tipo_perfil_id = data.tipo_perfil_id;
    this.model.varPerfilUsuario.activo = (data.activo == 'S') ? true : false;
  }

  savePerfilUsuario() {
    this.model.varPerfilUsuario.perfil_id = Number(this.model.varPerfilUsuario.perfil_id);
    this.model.varPerfilUsuario.usuario_id = Number(this.model.varPerfilUsuario.usuario_id);
    this.model.varPerfilUsuario.tipo_perfil_id = Number(this.model.varPerfilUsuario.tipo_perfil_id);

    console.log(this.model.varPerfilUsuario);

    this.perfilUsuario.createPerfilesUsuarios(this.model.varPerfilUsuario).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Perfiles - Usuarios',
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

  updatePerfilUsuario() {
    this.model.varPerfilUsuario.perfil_id = Number(this.model.varPerfilUsuario.perfil_id);
    this.model.varPerfilUsuario.usuario_id = Number(this.model.varPerfilUsuario.usuario_id);
    this.model.varPerfilUsuario.tipo_perfil_id = Number(this.model.varPerfilUsuario.tipo_perfil_id);

    console.log(this.model.varPerfilUsuario);

    this.perfilUsuario.updatePerfilesUsuarios(this.model.varPerfilUsuario).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Perfiles - Usuarios',
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
