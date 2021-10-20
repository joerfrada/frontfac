import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';
import { GradoService } from 'src/app/services/modules/grado.service';
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
  varcategoria: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vargrado: any = [];
  vargradoTemp: any = [];

  currentUser: any

  constructor(private router: Router, 
              private api: ApiService, 
              private requerimiento: RequerimientoService,
              private especialidad: EspecialidadService,
              private grado: GradoService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varRequerimiento.usuario_creador = this.currentUser.usuario;
    this.model.varRequerimiento.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getRequerimientos();
    this.getListas();
    this.getEspecialidades();
    this.getGrados();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getRequerimientos() {
    let json: any = {
      filtro: 0
    }

    this.requerimiento.getRequerimientos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    });
  }

  getListas() {
    let varlistas = JSON.parse(localStorage.getItem("listasDinamicasFull") as any);
    this.varcategoria = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CATEGORIA');
    this.varcategoria.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
  }

  getEspecialidades() {
    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varespecialidad = response.result;
        this.varespecialidadTemp = response.result;
      }
    });
  }

  getGrados() {
    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vargrado = response.result;
        this.vargradoTemp = response.result;
      }
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

    this.model.varRequerimiento.usuario_creador = this.currentUser.usuario;
    this.model.varRequerimiento.usuario_modificador = this.currentUser.usuario;

    console.log(this.model.varRequerimiento);
  }

  changeCategoria(id: any) {
    this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.tipo_categoria_id == id);
    this.vargrado = this.vargradoTemp.filter((x: any) => x.categoria_id == id);
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
    });
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
    });
  }

}
