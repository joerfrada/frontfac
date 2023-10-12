import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ListaDinamicaService } from '../../../services/modules/lista-dinamica.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

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

  nombre_lista_id: any;

  modal: any;
  valorModal: any;
  editValorModal: any;

  varhistorial: any = [];
  varhistorialTemp: any = [];
  varnombreLista: any = [];

  varvalor: any = [];
  varvalorTemp: any = [];
  varlista: any = [];

  loading = true;

  currentUser: any;

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router, private api: ApiService, private listaDinamica: ListaDinamicaService, private usuario: UsuarioService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.getPermisos(this.currentUser.usuario, 'PM');
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

  searchLista(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.nombre_lista.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  searchValor(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    this.varvalor = this.varvalorTemp.filter((val: any) =>
      val.lista_dinamica.toLowerCase().includes(filtro) || val.lista_dinamica_padre.toLowerCase().includes(filtro)
    );
  }

  getNombresListasFull() {
    this.listaDinamica.getListasDinamicasFull().subscribe(data => {
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
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getListasDinamicasFull(update: any = false) {
    this.listaDinamica.getListasDinamicasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
        });
        this.varlista = response.result;
        if (update == true) {
          setTimeout(() => {
            localStorage.setItem("listasDinamicasFull", JSON.stringify(response.result));
          }, 500);
        }
      }
    })
  }

  updateListasDinamicasFull() {
    localStorage.removeItem("listasDinamicasFull");
    this.getListasDinamicasFull(true);
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Nombre Lista";
    this.model.tipo = 'C';

    this.model.varNombreLista.usuario_creador = this.currentUser.usuario;
    this.model.varNombreLista.usuario_modificador = this.currentUser.usuario;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  openValor(data: any) {
    this.valorModal = true;
    this.model.title = "Listas Dinámicas - " + data.nombre_lista;

    this.nombre_lista_id = data.nombre_lista_id;
    this.model.varListaDinamica.nombre_lista_id = data.nombre_lista_id;
    this.model.varListaDinamica.usuario_creador = this.currentUser.usuario;
    this.model.varListaDinamica.usuario_modificador = this.currentUser.usuario;

    this.listaDinamica.getListasDinamicas({ nombre_lista_id: data.nombre_lista_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varvalor = response.result;
        this.varvalorTemp = response.result;
      }
    });
  }

  openValorById(id: any) {
    this.listaDinamica.getListasDinamicas({ nombre_lista_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varvalor = response.result;
        this.varvalorTemp = response.result;
      }
    });
  }

  closeValorModal(bol: any) {
    this.valorModal = bol;
  }

  editNombreLista(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Nombre Lista";
    this.model.tipo = 'U';
    this.model.varNombreLista.usuario_creador = this.currentUser.usuario;
    this.model.varNombreLista.usuario_modificador = this.currentUser.usuario;

    this.model.varNombreLista.nombre_lista_id = data.nombre_lista_id;
    this.model.varNombreLista.nombre_lista = data.nombre_lista;
    this.model.varNombreLista.descripcion = data.descripcion;
    this.model.varNombreLista.nombre_lista_padre_id = data.nombre_lista_padre_id;
    this.model.varNombreLista.activo = (data.activo == 'S') ? true : false;
  }

  saveNombreLista() {
    this.model.varNombreLista.nombre_lista_padre_id = Number(this.model.varNombreLista.nombre_lista_padre_id);

    if (this.model.varNombreLista == "") {
      swal({
        title: 'ERROR',
        text: "Por favor ingrese el campo 'Nombre Lista'",
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'error'
      })
    }
    else {
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
  }

  updateNombreLista() {
    this.model.varNombreLista.nombre_lista_padre_id = Number(this.model.varNombreLista.nombre_lista_padre_id);
   
    if (this.model.varNombreLista == "") {
      swal({
        title: 'ERROR',
        text: "Por favor ingrese el campo 'Nombre Lista'",
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'error'
      })
    }
    else {
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
            this.openValorById(this.model.varNombreLista.nombre_lista_id);
            this.reload();
          })
        }
      }));
    }
  }

  crearValorModal() {
    this.editValorModal = true;
    this.model = new Model();
    this.model.title = 'Crear Listas Dinámicas'
    this.model.tipo = 'C';

    this.model.varListaDinamica.nombre_lista_id = this.nombre_lista_id;
    this.model.varListaDinamica.usuario_creador = this.currentUser.usuario;
    this.model.varListaDinamica.usuario_modificador = this.currentUser.usuario;
  }

  editarValorModal(data: any) {
    this.editValorModal = true;
    this.model.title = 'Actualizar Listas Dinámicas'
    this.model.tipo = 'U';
    this.model.varListaDinamica.usuario_creador = this.currentUser.usuario;
    this.model.varListaDinamica.usuario_modificador = this.currentUser.usuario;

    this.model.varListaDinamica.lista_dinamica_id = data.lista_dinamica_id;
    this.model.varListaDinamica.nombre_lista_id = data.nombre_lista_id;
    this.model.varListaDinamica.lista_dinamica = data.lista_dinamica;
    this.model.varListaDinamica.descripcion = data.descripcion;
    this.model.varListaDinamica.lista_dinamica_padre_id = data.lista_dinamica_padre_id;
    this.model.varListaDinamica.activo = (data.activo == 'S') ? true : false;
  }

  closeEditarValorModal(bol: any) {
    this.editValorModal = bol;
  }

  createValor() {
    if (this.model.varListaDinamica.lista_dinamica == "") {
      swal({
        title: 'ERROR',
        text: "Por favor ingrese el campo 'Nombre'",
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'error'
      })
    }
    else {
      this.model.varListaDinamica.lista_dinamica_padre_id = Number(this.model.varListaDinamica.lista_dinamica_padre_id);

      this.listaDinamica.createListasDinamicas(this.model.varListaDinamica).subscribe((data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Listas Dinámicas',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.editValorModal = false;
            this.openValorById(this.model.varListaDinamica.nombre_lista_id);
            this.updateListasDinamicasFull();
          })
        }
      }));
    }
  }

  updateValor() {
    if (this.model.varListaDinamica.lista_dinamica == "") {
      swal({
        title: 'ERROR',
        text: "Por favor ingrese el campo 'Nombre'",
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'error'
      })
    }
    else {
      this.model.varListaDinamica.lista_dinamica_padre_id = Number(this.model.varListaDinamica.lista_dinamica_padre_id);

      this.listaDinamica.updateListasDinamicas(this.model.varListaDinamica).subscribe((data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Listas Dinámicas',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.editValorModal = false;
            this.openValorById(this.model.varListaDinamica.nombre_lista_id);
            this.updateListasDinamicasFull();
          })
        }
      }));
    }
  }

  clearListaSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }

  clearValorSearch(e: any) {
    if (e.target.value == "") {
      this.varvalor = this.varvalorTemp;
    }
  }

  getPermisos(user: any, cod_modulo: any) {
    this.usuario.getPermisosByUser({usuario: user, cod_modulo: cod_modulo}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varPermisos.consultar = response.result.consultar;
        this.varPermisos.crear = response.result.crear;
        this.varPermisos.actualizar = response.result.actualizar;
        this.varPermisos.eliminar = response.result.eliminar;
      }
    })
  }
}
