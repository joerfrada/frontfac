import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AplicacionService } from '../../../services/modules/aplicacion.service';

declare var swal: any;

export class Model {
  title: any;
  tipo = 'C';

  varAplicacion: any = {
    imagen: "../../../../assets/images/fileupload.jpg"
  }
}

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.scss']
})
export class AplicacionesComponent implements OnInit {

  model = new Model();

  varhistorial: any = [
    {
      aplicacion_id: 1,
      nombre: "App 1",
      descripcion: "Descripcion 1",
      orden: 4,
      saml: 'S',
      activo: 'S'
    },
    {
      aplicacion_id: 2,
      nombre: "App 2",
      descripcion: "Descripcion 2",
      orden: 2,
      saml: 'N',
      activo: 'S'
    },
    {
      aplicacion_id: 3,
      nombre: "App 3",
      descripcion: "Descripcion 3",
      orden: 3,
      saml: 'N',
      activo: 'N'
    },
    {
      aplicacion_id: 4,
      nombre: "App 4",
      descripcion: "Descripcion 4",
      orden: 1,
      saml: 'S',
      activo: 'N'
    }
  ];

  modal: any;

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.modal = true;
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
      this.model.varAplicacion.imagen = reader.result; 
    }
  }

}
