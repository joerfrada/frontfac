import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PerfilService } from '../../../services/modules/perfil.service';

declare var swal:any;

export class Model {
  title: any;

  varPerfil: any = {
    perfil_id: 0,
    nombres: "",
    apellidos: "",
    correo_electronico: "",
    avatar: "",
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  model = new Model();

  varhistorial: any = [];

  modal: any;

  constructor(private api: ApiService, private perfil: PerfilService) { 
    let currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varPerfil.usuario_creador = currentUser.usuario;
    this.model.varPerfil.usuario_modificador = currentUser.usuario;
  }

  ngOnInit(): void {
    this.getPerfiles();
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Perfil";
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  getPerfiles() {
    let json = {
      filtro: 0
    }

    this.perfil.getPerfiles(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    });
  }

  editPerfil(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Perfil";

    this.model.varPerfil.perfil_id = data.perfil_id;
    this.model.varPerfil.nombres = data.nombres;
    this.model.varPerfil.apellidos = data.apellidos;
    this.model.varPerfil.correo_electronico = data.correo_electronico;
    this.model.varPerfil.avatar = data.avatar;
    this.model.varPerfil.activo = (data.activo == 'S') ? true : false;
  }

  savePerfil() {
    console.log(this.model.varPerfil);
  }

  updatePerfil() {
    console.log(this.model.varPerfil);
  }

}
