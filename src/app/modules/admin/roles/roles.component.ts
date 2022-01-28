import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RolService } from '../../../services/modules/rol.service';

declare var swal:any;

export class Model {
  title = "";
  tipo = 'C';

  varRol: any = {
    rol_id: 0,
    rol: "",
    descripcion: "",
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  model = new Model();

  modal: any;

  varhistorial: any = [];
  varhistorialTemp: any = [];

  currentUser: any;

  constructor(private router: Router,
              private api: ApiService,
              private rol: RolService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varRol.usuario_creador = this.currentUser.usuario;
    this.model.varRol.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getRoles();
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

  getRoles() {
    let json: any = {
      filtro: 0
    }

    this.rol.getRoles(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  openModal() {
    this.modal = true;
    this.model.title = 'Crear Rol';
    this.model.tipo = 'C';
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editRoles(data: any) {
    this.modal = true;
    this.model.title = 'Actualizar Rol';
    this.model.tipo = 'U';
  }

  saveRoles() {
    this.rol.createRoles(this.model.varRol).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Roles',
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

  updateRoles() {
    this.rol.updateRoles(this.model.varRol).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Roles',
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
