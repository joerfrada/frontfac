import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RequerimientoService } from '../../../services/modules/requerimiento.service';

declare var swal:any;

export class Model {
  title = "";
  tipo = 'C';

  varRequerimiento: any = {
    requerimiento_id: 0,
    requerimiento: "",
    categoria_id: 0,
    especialidad_id: 0,
    grado_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }
}

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.scss']
})
export class RequerimientosComponent implements OnInit {

  model = new Model();

  modal: any;

  varhistorial: any = [];

  currentUser: any

  constructor(private router: Router, private api: ApiService, private requerimiento: RequerimientoService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varRequerimiento.usuario_creador = this.currentUser.usuario;
    this.model.varRequerimiento.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  clearRequerimientos() {
    this.model.varRequerimiento = {
      requerimiento_id: 0,
      requerimiento: "",
      categoria_id: 0,
      especialidad_id: 0,
      grado_id: 0,
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    }
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Requerimiento";
    this.model.tipo = 'C';

    this.clearRequerimientos();
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editRequerimiento(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Requerimiento";
    this.model.tipo = 'U';

    this.model.varRequerimiento.requerimiento_id = data.requerimiento_id;
    this.model.varRequerimiento.requerimiento = data.requerimiento;
    this.model.varRequerimiento.categoria_id = data.categoria_id;
    this.model.varRequerimiento.especialidad_id = data.especialidad_id;
    this.model.varRequerimiento.grado_id = data.grado_id;
    this.model.varRequerimiento.activo = (data.activo == 'S') ? true : false;

    console.log(this.model.varRequerimiento);
  }

  saveRequerimiento() {
    this.model.varRequerimiento.categoria_id = Number(this.model.varRequerimiento.categoria_id);
    this.model.varRequerimiento.especialidad_id = Number(this.model.varRequerimiento.especialidad_id);
    this.model.varRequerimiento.grado_id = Number(this.model.varRequerimiento.grado_id);

    if (this.model.varRequerimiento.categoria_id == 0)
      this.model.varRequerimiento.categoria_id = null;

    if (this.model.varRequerimiento.especialidad_id == 0)
      this.model.varRequerimiento.especialidad_id = null;
    
    if (this.model.varRequerimiento.grado_id == 0)
      this.model.varRequerimiento.grado_id = null;
    
    console.log(this.model.varRequerimiento);

    this.requerimiento.createRequerimientos(this.model.varRequerimiento).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Requerimientos',
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

  updateRequerimiento() {
    this.model.varRequerimiento.categoria_id = Number(this.model.varRequerimiento.categoria_id);
    this.model.varRequerimiento.especialidad_id = Number(this.model.varRequerimiento.especialidad_id);
    this.model.varRequerimiento.grado_id = Number(this.model.varRequerimiento.grado_id);

    if (this.model.varRequerimiento.categoria_id == 0)
      this.model.varRequerimiento.categoria_id = null;

    if (this.model.varRequerimiento.especialidad_id == 0)
      this.model.varRequerimiento.especialidad_id = null;
    
    if (this.model.varRequerimiento.grado_id == 0)
      this.model.varRequerimiento.grado_id = null;
    
    console.log(this.model.varRequerimiento);

    this.requerimiento.updateRequerimientos(this.model.varRequerimiento).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Requerimientos',
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
