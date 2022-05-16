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
    especialidad: "",
    grado_id: 0,
    grado: "",
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
  varhistorialTemp: any = [];
  varcategoria: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vargrado: any = [];
  vargradoTemp: any = [];
  vargradoOficial: any = [];
  vargradoSubOficial: any = [];

  titleModal = "";
  selectModal: any;
  array: any = [];
  indexform: any;

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
    this.getEspecialidadesFull();
    this.getGradosFull();
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
        if (item.requerimiento.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.categoria.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.especialidad.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.grado.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  getRequerimientos() {
    let json: any = {
      filtro: 0
    }

    this.requerimiento.getRequerimientos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
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

  getEspecialidadesFull() {
    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.especialidad;
        });
        this.varespecialidadTemp = response.result;
      }
    })
  }

  getGradosFull() {
    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.sigla = x.grado;
        });
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
    this.model.title = "Crear Requisito del Ley";
    this.model.tipo = 'C';

    this.clearRequerimientos();
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editRequerimiento(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Requisito del Ley";
    this.model.tipo = 'U';

    this.model.varRequerimiento.requerimiento_id = data.requerimiento_id;
    this.model.varRequerimiento.requerimiento = data.requerimiento;
    this.model.varRequerimiento.categoria_id = data.categoria_id;
    this.model.varRequerimiento.especialidad_id = data.especialidad_id;
    this.model.varRequerimiento.especialidad = data.especialidad;
    this.model.varRequerimiento.grado_id = data.grado_id;
    this.model.varRequerimiento.grado = data.grado;
    this.model.varRequerimiento.activo = (data.activo == 'S') ? true : false;

    this.model.varRequerimiento.usuario_creador = this.currentUser.usuario;
    this.model.varRequerimiento.usuario_modificador = this.currentUser.usuario;

    this.changeCategoria(data.categoria_id);
  }

  changeCategoria(id: any) {
    this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.tipo_categoria_id == id);
    this.vargrado = this.vargradoTemp.filter((x: any) => x.categoria_id == id);
  }

  saveRequerimiento() {
    this.model.varRequerimiento.categoria_id = Number(this.model.varRequerimiento.categoria_id);
    this.model.varRequerimiento.especialidad_id = Number(this.model.varRequerimiento.especialidad_id);
    this.model.varRequerimiento.grado_id = Number(this.model.varRequerimiento.grado_id);

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

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveEspecialidad() {
    this.titleModal = 'Especialidades';
    this.array = this.varespecialidad;
    this.indexform = 'especialidad';
    this.selectModal = true;
  }

  saveGrado() {
    this.titleModal = 'Grados';
    this.array = this.vargrado;
    this.indexform = 'grado';
    this.selectModal = true;
  }

  dataform(indexform: any, data: any) {
    this.selectModal = false;

    if (indexform == 'especialidad') {
      this.model.varRequerimiento.especialidad_id = data.especialidad_id;
      this.model.varRequerimiento.especialidad = data.descripcion;
    }

    if (indexform == 'grado') {
      this.model.varRequerimiento.grado_id = data.grado_id;
      this.model.varRequerimiento.grado = data.grado;
    }
  }
}
