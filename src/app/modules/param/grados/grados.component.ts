import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GradoService } from '../../../services/modules/grado.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

declare var swal: any;

export class Model {
  title: any;
  tipo = 'C';

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
  varhistorialTemp: any = [];
  varcategoria: any = [];
  varnivel: any = [];
  varnivelTemp: any = [];
  varnivel_oficial: any = [];
  varnivel_suboficial: any = [];
  vargrado_prev: any = [];

  IsLectura: boolean = true;
  loading = true;

  currentUser: any;

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router, private api: ApiService, private grado: GradoService, private usuario: UsuarioService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.model.varGrado.usuario_creador = this.currentUser.usuario;
    this.model.varGrado.usuario_modificador = this.currentUser.usuario;
    this.getPermisos(this.currentUser.usuario, 'PM');
  }

  ngOnInit(): void {
    this.getGrados();
    this.getListas();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.grado.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.descripcion.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  getGrados() {
    let json: any = {
      filtro: 0
    }

    this.grado.getGrados(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });

    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vargrado_prev = response.result;
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
    this.varnivel_oficial = varlistas.filter((x: any) => x.nombre_lista == 'BAS_NIVEL_OFICIALES');
    this.varnivel_oficial.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varnivel_suboficial = varlistas.filter((x: any) => x.nombre_lista == 'BAS_NIVEL_SUBOFICIALES');
    this.varnivel_suboficial.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varnivel = this.varnivel_oficial.concat(this.varnivel_suboficial);
    this.varnivelTemp = this.varnivel_oficial.concat(this.varnivel_suboficial);
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Grado";
    this.model.tipo = 'C';
    this.IsLectura = false;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  changeNivel(id: any) {
    this.varnivel = this.varnivelTemp.filter((x: any) => x.nombre_lista_id == id);
  }

  editGrado(data: any) {
    this.model.title = "Actualizar Grado";
    this.model.tipo = 'U';
    this.modal = true;
    this.IsLectura = false;

    this.model.varGrado.grado_id = data.grado_id;
    this.model.varGrado.grado = data.grado;
    this.model.varGrado.descripcion = data.descripcion;
    this.model.varGrado.duracion = data.duracion;
    this.model.varGrado.nivel_id = data.nivel_id;
    this.model.varGrado.grado_previo_id = data.grado_previo_id;
    this.model.varGrado.categoria_id = data.categoria_id;
    this.model.varGrado.activo = (data.activo == 'S') ? true : false;
  }

  saveGrado() {
    this.model.varGrado.usuario_creador = this.currentUser.usuario;
    this.model.varGrado.usuario_modificador = this.currentUser.usuario;

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

    this.grado.createGrados(this.model.varGrado).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Grados',
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

  updateGrado() {
    this.model.varGrado.usuario_creador = this.currentUser.usuario;
    this.model.varGrado.usuario_modificador = this.currentUser.usuario;

    this.model.varGrado.nivel_id = Number(this.model.varGrado.nivel_id);
    this.model.varGrado.grado_previo_id = Number(this.model.varGrado.grado_previo_id);
    this.model.varGrado.categoria_id = Number(this.model.varGrado.categoria_id);

    if (this.model.varGrado.nivel_id == 0)
      this.model.varGrado.nivel_id = null;

    if (this.model.varGrado.grado_previo_id == 0)
      this.model.varGrado.grado_previo_id = null;

    if (this.model.varGrado.categoria_id == 0)
      this.model.varGrado.categoria_id = null;

    this.grado.updateGrados(this.model.varGrado).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Grados',
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

  openDetalle(data: any) {
    this.model.title = "Detalle Grado";
    this.model.tipo = 'L';
    this.modal = true;
    this.IsLectura = true;

    this.model.varGrado.grado_id = data.grado_id;
    this.model.varGrado.grado = data.grado;
    this.model.varGrado.descripcion = data.descripcion;
    this.model.varGrado.duracion = data.duracion;
    this.model.varGrado.nivel_id = data.nivel_id;
    this.model.varGrado.grado_previo_id = data.grado_previo_id;
    this.model.varGrado.categoria_id = data.categoria_id;
    this.model.varGrado.activo = (data.activo == 'S') ? true : false;
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
  
  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }
}
