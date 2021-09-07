import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PerfilUsuarioService } from '../../../services/modules/perfil-usuario.service';

export class Model {
  title: any;

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

  constructor(private api: ApiService, private perfilUsuario: PerfilUsuarioService) { 
    let currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varPerfilUsuario.usuario_creador = currentUser.usuario;
    this.model.varPerfilUsuario.usuario_modificador = currentUser.usuario;
  }

  ngOnInit(): void {
    this.getPerfilesUsuarios();
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Perfil-Usuario";
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
  }

  updatePerfil() {
    this.model.varPerfilUsuario.perfil_id = Number(this.model.varPerfilUsuario.perfil_id);
    this.model.varPerfilUsuario.usuario_id = Number(this.model.varPerfilUsuario.usuario_id);
    this.model.varPerfilUsuario.tipo_perfil_id = Number(this.model.varPerfilUsuario.tipo_perfil_id);

    console.log(this.model.varPerfilUsuario);
  }

}
