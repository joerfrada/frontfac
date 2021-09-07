import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ListaDinamicaService } from '../../../services/modules/lista-dinamica.service';

export class Model {
  title: any;

  varNombreLista: any = {
    nombre_lista_id: 0,
    descripcion: "",
    nombre_lista_padre_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };
}
@Component({
  selector: 'app-valores-flexibles',
  templateUrl: './valores-flexibles.component.html',
  styleUrls: ['./valores-flexibles.component.scss']
})
export class ValoresFlexiblesComponent implements OnInit {

  model = new Model();

  modal: any;
  valorModal: any;

  varhistorial: any = [];
  varnombreLista: any = [];

  varvalor: any = [];

  constructor(private api: ApiService, private listaDinamica: ListaDinamicaService) { 
    let currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varNombreLista.usuario_creador = currentUser.usuario;
    this.model.varNombreLista.usuario_modificador = currentUser.usuario;
  }

  ngOnInit(): void {
    this.getNombresListas();
    this.getNombresListasFull();
  }

  getNombresListasFull() {
    this.listaDinamica.getNombresListasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varnombreLista = response.result;
      }
    });
  }

  getNombresListas() {
    let json: any = {
      filtro: 0
    }
    this.listaDinamica.getNombresListas(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    });
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Nombre Lista";
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  openValor() {
    this.valorModal = true;
  }

  closeValorModal(bol: any) {
    this.valorModal = bol;
  }

  editNombreLista(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Nombre Lista";

    this.model.varNombreLista.nombre_lista_id = data.nombre_lista_id;
    this.model.varNombreLista.nombre_lista = data.nombre_lista;
    this.model.varNombreLista.descripcion = data.descripcion;
    this.model.varNombreLista.nombre_lista_padre_id = data.nombre_lista_padre_id;
    this.model.varNombreLista.activo = (data.activo == 'S') ? true : false;

    console.log(this.model.varNombreLista);
  }

  saveNombreLista() {
    this.model.varNombreLista.nombre_lista_padre_id = Number(this.model.varNombreLista.nombre_lista_padre_id);
    
    if (this.model.varNombreLista.nombre_lista_padre_id == 0)
      this.model.varNombreLista.nombre_lista_padre_id = null;

    console.log(this.model.varNombreLista);
  }

  updateNombreLista() {
    this.model.varNombreLista.nombre_lista_padre_id = Number(this.model.varNombreLista.nombre_lista_padre_id);
    
    if (this.model.varNombreLista.nombre_lista_padre_id == 0)
      this.model.varNombreLista.nombre_lista_padre_id = null;

    console.log(this.model.varNombreLista);
  }

}
