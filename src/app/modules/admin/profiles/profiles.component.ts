import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { PerfilService } from '../../../services/modules/perfil.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

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

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private perfil: PerfilService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.model.varPerfil.usuario_creador = this.currentUser.usuario;
    this.model.varPerfil.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getPerfiles();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  clearPerfil() {
    this.model.varPerfil = {
      perfil_id: 0,
      nombres: "",
      apellidos: "",
      correo_electronico: "",
      avatar: "",
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    };
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Perfil";
    this.model.tipo = 'C';

    this.clearPerfil();
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
    this.model.tipo = 'U';

    this.model.varPerfil.perfil_id = data.perfil_id;
    this.model.varPerfil.nombres = data.nombres;
    this.model.varPerfil.apellidos = data.apellidos;
    this.model.varPerfil.correo_electronico = data.correo_electronico;
    this.model.varPerfil.avatar = data.avatar;
    this.model.varPerfil.activo = (data.activo == 'S') ? true : false;
  }

  savePerfil() {
    this.perfil.createPerfiles(this.model.varPerfil).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Perfiles',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    })
  }

  updatePerfil() {
    this.perfil.updatePerfiles(this.model.varPerfil).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Perfiles',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    })
  }

}
