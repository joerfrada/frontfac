import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CargoService } from '../../../services/modules/cargo.service';
import { AreaService } from 'src/app/services/modules/area.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';
import { CuerpoService } from 'src/app/services/modules/cuerpo.service';
import { GradoService } from 'src/app/services/modules/grado.service';

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

  varRutaRequisito: any = {
    ruta_requisito_id: 0,
    ruta_requisito: ""
  }

  varArea: any = {
    area_id: 0,
    area: ""
  }

  varCuerpo: any = {
    cuerpo_id: 0,
    cuerpo: ""
  }

  varEspecialidad: any = {
    especialidad_id: 0,
    especialidad: ""
  }
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

  lstGrados: any = [];
  vargrados: any = [];

  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vararea: any = [];
  varareaTemp: any = [];

  varitems: any = [];
  varselectedItems: any = [];

  currentUser: any;

  selectModal: any;
  indexform = 0;

  constructor(private api: ApiService,
              private cargo: CargoService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService,
              private area: AreaService,
              private grado: GradoService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;
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

    this.area.getAreasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.area_id;
        });
        this.vararea = response.result;
      }
    });

    this.cuerpo.getCuerposFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.cuerpo_id;
        });
        this.varcuerpo = response.result;
      }
    });

    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.especialidad_id;
        });
        this.varespecialidad = response.result;
      }
    });

    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstGrados = response.result;
      }
    })
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Cargo";
    this.model.tipo = 'C';
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

  addGrado() {
    this.vargrados.push({grado_id:0, grado:"", NuevoRegistro: true});
  }

  deleteGrado(index: any) {
    this.vargrados.splice(index, 1);
  }

  editCargos(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Cargos";
    this.model.tipo = 'U';

    this.model.varCargo.cargo_id = data.cargo_id;
    this.model.varCargo.cargo = data.cargo;
    this.model.varCargo.descripcion = data.descripcion;
    this.model.varCargo.clase_cargo_id = data.clase_cargo_id;
    this.model.varCargo.categoria_id = data.categoria_id;
    this.model.varCargo.activo = (data.activo == 'S') ? true : false;

    console.log(this.model.varCargo);
  }

  saveCargos() {
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;

    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);

    if (this.model.varCargo.clase_cargo_id == 0)
      this.model.varCargo.clase_cargo_id = null;

    if (this.model.varCargo.categoria_id == 0)
      this.model.varCargo.categoria_id = null;

    console.log(this.model.varCargo);
  }

  updateCargos() {
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;
    
    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);

    if (this.model.varCargo.clase_cargo_id == 0)
      this.model.varCargo.clase_cargo_id = null;

    if (this.model.varCargo.categoria_id == 0)
      this.model.varCargo.categoria_id = null;

    console.log(this.model.varCargo);
  }

  openCuerpoSelect() {
    this.selectModal = true;
    this.indexform = 1;
    this.varitems = this.varcuerpo;
    if (this.varcuerpoTemp.length > 0) {
      this.varselectedItems = this.varcuerpoTemp.filter((x: any) => x.indice == 1);
    }
    else this.varselectedItems = [];
  }

  openEspecialidadSelect() {
    this.selectModal = true;
    this.indexform = 2;
    this.varitems = this.varespecialidad;
    if (this.varespecialidadTemp.length > 0) {
      this.varselectedItems = this.varespecialidadTemp.filter((x: any) => x.indice == 2);
    }
    else this.varselectedItems = [];
  }

  openAreaSelect() {
    this.selectModal = true;
    this.indexform = 3;
    this.varitems = this.vararea;
    if (this.varareaTemp.length > 0) {
      this.varselectedItems = this.varareaTemp.filter((x: any) => x.indice == 3);
    }
    else this.varselectedItems = [];
  }
  
  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveSelected(e: any, indexform: any) {
    if (indexform == 1) {
      this.varcuerpoTemp = e;
      this.model.varCuerpo.cuerpo = e.map((x: any) => x.sigla).join(", ");
    }
    else if (indexform == 2) {
      this.varespecialidadTemp = e;
      this.model.varEspecialidad.especialidad = e.map((x: any) => x.sigla).join(", ");
    }
    else if (indexform == 3) {
      this.varareaTemp = e;
      this.model.varArea.area = e.map((x: any) => x.sigla).join(", ");
    }
  }
}
