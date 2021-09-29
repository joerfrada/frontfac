import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CargoService } from '../../../services/modules/cargo.service';

export class Model {
  title: any;
  tipo = 'C';

  varCargo: any = {
    cargo_id: 0,
    cargo: "",
    descripcion: "",
    clase_cargo_id: 0,
    categoria_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };
}

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

  model = new Model();
  
  modal: any;
  configModal: any;
  tab: any;

  varhistorial: any = [];
  varclase: any = [];
  varcategoria: any = [];

  vargrados: any = [];

  constructor(private api: ApiService, private cargo: CargoService) { 
    let currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varCargo.usuario_creador = currentUser.usuario;
    this.model.varCargo.usuario_modificador = currentUser.usuario;
  }

  ngOnInit(): void {
    this.tab = 1;
    this.getCargos();
    this.getListas();
  }

  getCargos() {
    let json: any = {
      filtro: 0
    }

    this.cargo.getCargos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    })
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Cargo";
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  openConfigModal() {
    this.configModal = true;
  }

  closeConfigModal(bol: any) {
    this.configModal = bol;
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  getListas() {
    let varlistas = JSON.parse(localStorage.getItem("listasDinamicasFull") as any);
    this.varcategoria = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CATEGORIA');
    this.varcategoria.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varclase = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CARGO');
    this.varclase.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
  }

  editCargos(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Cargos";

    this.model.varCargo.cargo_id = data.cargo_id;
    this.model.varCargo.cargo = data.cargo;
    this.model.varCargo.descripcion = data.descripcion;
    this.model.varCargo.clase_cargo_id = data.clase_cargo_id;
    this.model.varCargo.categoria_id = data.categoria_id;
    this.model.varCargo.activo = (data.activo == 'S') ? true : false;
  }

  saveCargos() {
    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);

    if (this.model.varCargo.clase_cargo_id == 0)
      this.model.varCargo.clase_cargo_id = null;

    if (this.model.varCargo.categoria_id == 0)
      this.model.varCargo.categoria_id = null;

    console.log(this.model.varCargo);
  }

  updateCargos() {
    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);

    if (this.model.varCargo.clase_cargo_id == 0)
      this.model.varCargo.clase_cargo_id = null;

    if (this.model.varCargo.categoria_id == 0)
      this.model.varCargo.categoria_id = null;

    console.log(this.model.varCargo);
  }

}
