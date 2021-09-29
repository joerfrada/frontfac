import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AreaService } from 'src/app/services/modules/area.service';
import { CuerpoService } from 'src/app/services/modules/cuerpo.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varCuerpo: any = {
    cuerpo_id: 0,
    tipo_categoria_id: 0,
    sigla: "",
    cuerpo: "",
    usuario_creador: "",
    usuario_modificador: ""
  }

  varEspecialidad: any = {
    especialidad_id: 0,
    tipo_categoria_id: 0,
    sigla: "",
    especialidad: "",
    usuario_creador: "",
    usuario_modificador: ""
  }

  varArea: any = {
    area_id: 0,
    tipo_categoria_id: 0,
    sigla: "",
    area: "",
    usuario_creador: "",
    usuario_modificador: ""
  }
}

@Component({
  selector: 'app-siglas',
  templateUrl: './siglas.component.html',
  styleUrls: ['./siglas.component.scss']
})
export class SiglasComponent implements OnInit {

  model = new Model();

  tab: any;

  varcuerpo: any = [];
  varespecialidad: any = [];
  vararea: any = [];

  currentUser: any;

  cuerpoModal: any;
  especialidadModal: any;
  areaModal: any;

  varcategoria: any = [];

  constructor(private router: Router,
              private api: ApiService,
              private area: AreaService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
  }

  ngOnInit(): void {
    this.tab = 1;
    this.filtro();
    this.getListas();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  filtro() {
    let json: any = {
      filtro: 0
    }

    this.area.getAreas(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vararea =  response.result;
        console.log('Areas', response.result);
      }
    });

    this.cuerpo.getCuerpos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varcuerpo = response.result;
        console.log('Cuerpos', response.result);
      }
    });

    this.especialidad.getEspecialidades(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varespecialidad = response.result;
        console.log('Especialidades', response.result);
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

  openModal(tipo = 1) {
    this.model = new Model();
    this.model.tipo = 'C';
    console.log(this.currentUser);

    if (tipo == 1) {
      this.cuerpoModal = true;
      this.model.title = "Crear Cuerpo"; 
    }
    else if (tipo == 2) {
      this.especialidadModal = true;
      this.model.title = "Crear Especialidad";
    }
    else if (tipo == 3) {
      this.areaModal = true;
      this.model.title = "Crear Área";
    }
  }

  closeModal(bol: any, tipo = 1) {
    if (tipo == 1) this.cuerpoModal = bol;
    else if (tipo == 2) this.especialidadModal = bol;
    else if (tipo == 3) this.areaModal = bol;
  }

  editModal(data: any, tipo = 1) {
    this.model.tipo = 'U';

    if (tipo == 1) {
      this.cuerpoModal = true;
      this.model.title = "Actualizar Cuerpo";

      this.model.varCuerpo.cuerpo_id = data.cuerpo_id;
      this.model.varCuerpo.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varCuerpo.sigla = data.sigla;
      this.model.varCuerpo.cuerpo = data.cuerpo;
    }
    else if (tipo == 2) {
      this.especialidadModal = true;
      this.model.title = "Actualizar Especialidad";

      this.model.varEspecialidad.cuerpo_id = data.especialidad_id;
      this.model.varEspecialidad.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varEspecialidad.sigla = data.sigla;
      this.model.varEspecialidad.especialidad = data.especialidad;
    }
    else if (tipo == 3) {
      this.areaModal = true;
      this.model.title = "Actualizar Área";

      this.model.varArea.area_id = data.area_id;
      this.model.varArea.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varArea.sigla = data.sigla;
      this.model.varArea.area = data.area;
    }
  }

  saveData(tipo = 1) {
    console.log(this.currentUser.usuario);
    if (tipo == 1) {
      this.model.varCuerpo.tipo_categoria_id = Number(this.model.varCuerpo.tipo_categoria_id);
      this.model.varCuerpo.usuario_creador = this.currentUser.usuario;
      this.model.varCuerpo.usuario_modificador = this.currentUser.usuario;

      console.log('Cuerpo:', this.model.varCuerpo);

      this.cuerpo.createCuerpos(this.model.varCuerpo).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Cuerpos',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.cuerpoModal = false;
            this.reload();
          })
        }
      });
    }
    else if (tipo == 2) {
      this.model.varEspecialidad.tipo_categoria_id = Number(this.model.varEspecialidad.tipo_categoria_id);
      this.model.varEspecialidad.usuario_creador = this.currentUser.usuario;
      this.model.varEspecialidad.usuario_modificador = this.currentUser.usuario;

      console.log('Especialidad:', this.model.varEspecialidad);

      this.especialidad.createEspecialidades(this.model.varEspecialidad).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Especialidades',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.especialidadModal = false;
            this.reload();
          })
        }
      });
    }
    else if (tipo == 3) {
      this.model.varArea.tipo_categoria_id = Number(this.model.varArea.tipo_categoria_id);
      this.model.varArea.usuario_creador = this.currentUser.usuario;
      this.model.varArea.usuario_modificador = this.currentUser.usuario;

      console.log('Area:', this.model.varArea);

      this.area.createAreas(this.model.varArea).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Área de Conocimiento',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.especialidadModal = false;
            this.reload();
          })
        }
      });
    }
  }

  updateData(tipo = 1) {
    if (tipo == 1) {
      this.model.varCuerpo.tipo_categoria_id = Number(this.model.varCuerpo.tipo_categoria_id);
      this.model.varCuerpo.usuario_creador = this.currentUser.usuario;
      this.model.varCuerpo.usuario_modificador = this.currentUser.usuario;

      console.log('Cuerpo:', this.model.varCuerpo);

      this.cuerpo.updateCuerpos(this.model.varCuerpo).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Cuerpos',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.cuerpoModal = false;
            this.reload();
            this.tab = 1;
          })
        }
      });
    }
    else if (tipo == 2) {
      this.model.varEspecialidad.tipo_categoria_id = Number(this.model.varEspecialidad.tipo_categoria_id);
      this.model.varEspecialidad.usuario_creador = this.currentUser.usuario;
      this.model.varEspecialidad.usuario_modificador = this.currentUser.usuario;

      console.log('Especialidad:', this.model.varEspecialidad);

      this.especialidad.updateEspecialidades(this.model.varEspecialidad).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Especialidades',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.especialidadModal = false;
            this.reload();
            this.tab = 2;
          })
        }
      });
    }
    else if (tipo == 3) {
      this.model.varArea.tipo_categoria_id = Number(this.model.varArea.tipo_categoria_id);
      this.model.varArea.usuario_creador = this.currentUser.usuario;
      this.model.varArea.usuario_modificador = this.currentUser.usuario;

      console.log('Area:', this.model.varArea);

      this.area.updateAreas(this.model.varArea).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Área de Conocimiento',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.areaModal = false;
            this.reload();
            this.tab = 3;
          })
        }
      });
    }
  }
}
