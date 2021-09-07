import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { GradoService } from '../../../services/modules/grado.service';

export class Model {
  title: any;

  varGrado: any = {
    grado_id: 0,
    grado: "",
    descripcion: "",
    duracion: 0,
    nivel_id: 0,
    grado_previo_id: 0,
    categoria_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };
}

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.scss']
})
export class GradosComponent implements OnInit {

  model = new Model();

  modal: any;

  varhistorial: any = [];

  constructor(private api: ApiService, private grado: GradoService) { 
    let currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varGrado.usuario_creador = currentUser.usuario;
    this.model.varGrado.usuario_modificador = currentUser.usuario;
  }

  ngOnInit(): void {
    this.getGrados();
  }

  getGrados() {
    let json: any = {
      filtro: 0
    }

    this.grado.getGrados(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    });
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Grado";
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editGrado(data: any) {
    this.model.title = "Actualizar Grado";

    this.model.varGrado.grado_id = data.grado_id;
    this.model.varGrado.grado = data.grado;
    this.model.varGrado.descripcion = data.descripcion;
    this.model.varGrado.duracion = data.duracion;
    this.model.varGrado.nivel_id = data.nivel_id;
    this.model.varGrado.grado_previo_id = data.grado_previo_id;
    this.model.varGrado.categoria_id = data.categoria_id;
    this.model.varGrado.activo = (data.activo == 'S') ? true : false;

    console.log(this.model.varGrado);
  }

  saveGrado() {
    this.model.varGrado.nivel_id = Number(this.model.varGrado.nivel_id);
    this.model.varGrado.grado_previo_id = Number(this.model.varGrado.grado_previo_id);
    this.model.varGrado.categoria_id = Number(this.model.varGrado.categoria_id);

    if (this.model.varGrado.nivel_id == 0)
      this.model.varGrado.nivel_id = null;

    if (this.model.varGrado.grado_previo_id == 0)
      this.model.varGrado.grado_previo_id = null;

    if (this.model.varGrado.categoria_id == 0)
      this.model.varGrado.categoria_id = null;

    console.log(this.model.varGrado);
  }

  updateGrado() {
    this.model.varGrado.nivel_id = Number(this.model.varGrado.nivel_id);
    this.model.varGrado.grado_previo_id = Number(this.model.varGrado.grado_previo_id);
    this.model.varGrado.categoria_id = Number(this.model.varGrado.categoria_id);

    if (this.model.varGrado.nivel_id == 0)
      this.model.varGrado.nivel_id = null;

    if (this.model.varGrado.grado_previo_id == 0)
      this.model.varGrado.grado_previo_id = null;

    if (this.model.varGrado.categoria_id == 0)
      this.model.varGrado.categoria_id = null;

    console.log(this.model.varGrado);
  }

}
