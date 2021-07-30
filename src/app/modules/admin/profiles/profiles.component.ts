import { Component, OnInit } from '@angular/core';

declare var swal:any;

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  varhistorial = [
    {
      perfil_id: 1,
      nombres: "Joe",
      apellidos: "Rada",
      correo_electronico: "jrada@example.com",
      activo: true
    },
    {
      perfil_id: 2,
      nombres: "María",
      apellidos: "López",
      correo_electronico: "mlopez@example.com",
      activo: true
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
    swal({
      title: 'Perfiles',
      text: 'Seleccionaste en Crear',
      type: 'info',
      allowOutsideClick: false,
      showConfirmButton: true,
    });
  }

}
