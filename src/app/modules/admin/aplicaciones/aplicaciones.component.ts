import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AplicacionService } from '../../../services/modules/aplicacion.service';

declare var swal: any;

export class Model {
  title: any;
  tipo = 'C';

  varAplicacion: any = {
    aplicacion_id: 0,
    nombre: "",
    descripcion: "",
    orden: 0,
    url: "",
    logo: "../../../../assets/images/fileupload.jpg",
    saml: false,
    activo: true
  }
}

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.scss']
})
export class AplicacionesComponent implements OnInit {

  model = new Model();

  varhistorial: any = [];

  modal: any;

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private app: AplicacionService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varAplicacion.usuario_creador = this.currentUser.usuario;
    this.model.varAplicacion.usuario_modificador = this.currentUser.usuario;
   }

  ngOnInit(): void {
    this.getAplicaciones();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getAplicaciones() {
    let json = {
      filtro: 0
    }

    this.app.getAplicaciones(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        console.log(response.result);
      }
    });
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Aplicación";
    this.model.tipo = 'C';
  }

  editModal(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Aplicación";
    this.model.tipo = 'U';

    console.log(data);

    this.model.varAplicacion.aplicacion_id = data.aplicacion_id;
    this.model.varAplicacion.nombre = data.nombre;
    this.model.varAplicacion.descripcion = data.descripcion;
    this.model.varAplicacion.orden = data.orden;
    this.model.varAplicacion.url = data.url;
    this.model.varAplicacion.logo = data.logo;
    this.model.varAplicacion.saml = (data.saml == 'S') ? true : false;
    this.model.varAplicacion.saml = (data.activo == 'S') ? true : false;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  uploadFile($event: any) {
    const file = $event.target.files[0];
    
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      swal({
        "title": 'Error',
        "text": "Sólo se admiten imágenes.",
        "icon": "error"
      });
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.model.varAplicacion.logo = reader.result; 
    }
  }

  saveAplicacion() {
    this.model.varAplicacion.usuario_creador = this.currentUser.usuario;
    this.model.varAplicacion.usuario_modificador = this.currentUser.usuario;

    console.log(this.model.varAplicacion);

    this.app.createAplicaciones(this.model.varAplicacion).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Aplicaciones',
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

  updateAplicacion() {
    this.model.varAplicacion.usuario_creador = this.currentUser.usuario;
    this.model.varAplicacion.usuario_modificador = this.currentUser.usuario;

    console.log(this.model.varAplicacion);
  }

}
