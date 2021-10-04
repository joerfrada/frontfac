import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ListaDinamicaService } from '../../../services/modules/lista-dinamica.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varNombreLista: any = {
    nombre_lista_id: 0,
    descripcion: "",
    nombre_lista_padre_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };

  varListaDinamica: any = {
    lista_dinamica_id: 0,
    nombre_lista_id: 0,
    lista_dinamica: "",
    descripcion: "",
    lista_dinamica_padre_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }
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
  editValorModal: any;

  varhistorial: any = [];
  varnombreLista: any = [];

  varvalor: any = [];
  varlista: any = [];

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private listaDinamica: ListaDinamicaService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varNombreLista.usuario_creador = this.currentUser.usuario;
    this.model.varNombreLista.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getNombresListas();
    this.getNombresListasFull();
    this.getListasDinamicasFull();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  clearNombreLista() {
    this.model.varNombreLista = {
      nombre_lista_id: 0,
      descripcion: "",
      nombre_lista_padre_id: 0,
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    };
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

  getListasDinamicasFull() {
    this.listaDinamica.getListasDinamicasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
        });
      }
    })
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Nombre Lista";
    this.model.tipo = 'C';
    this.clearNombreLista();
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
    this.model.tipo = 'U';

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

    this.listaDinamica.createNombresListas(this.model.varNombreLista).subscribe((data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Nombres Listas',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    }));
  }

  updateNombreLista() {
    this.model.varNombreLista.nombre_lista_padre_id = Number(this.model.varNombreLista.nombre_lista_padre_id);
    
    if (this.model.varNombreLista.nombre_lista_padre_id == 0)
      this.model.varNombreLista.nombre_lista_padre_id = null;

    console.log(this.model.varNombreLista);

    this.listaDinamica.updateNombresListas(this.model.varNombreLista).subscribe((data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Nombres Listas',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    }));
  }

  editarValorModal(data: any) {
    this.editValorModal = true;

    this.model.varListaDinamica.lista_dinamica_id = data.lista_dinamica_id;
    this.model.varListaDinamica.nombre_lista_id = data.nombre_lista_id;
    this.model.varListaDinamica.lista_dinamica = data.lista_dinamica;
    this.model.varListaDinamica.descripcion = data.descripcion;
    this.model.varListaDinamica.lista_dinamica_padre_id = data.lista_dinamica_padre_id;
    this.model.varListaDinamica.activo = (data.activo == 'S') ? true : false;
  }

  closeEditarValorModal(bol: any) {
    this.editarValorModal = bol;
  }

  addValor() {
    this.varvalor.push({ lista_dinamica_id: 0, nombre_lista_id: 0, lista_dinamica: "", descripcion: "", lista_dinamica_padre_id: 0, activo: true, NuevoRegistro: true});
  }

  deleteValor(index: any) {
    this.varvalor.splice(index, 1);
  }

}
