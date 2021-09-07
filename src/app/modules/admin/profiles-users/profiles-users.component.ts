import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles-users',
  templateUrl: './profiles-users.component.html',
  styleUrls: ['./profiles-users.component.scss']
})
export class ProfilesUsersComponent implements OnInit {

  modal: any;

  varhistorial = [
    {
      perfil_usuario_id: 1,
      usuario: 'jrada',
      perfil: 'Joe Rada',
      tipo_perfil: 'Administrador',
      activo: true
    },
    {
      perfil_usuario_id: 2,
      usuario: 'mlopez',
      perfil: 'María López',
      tipo_perfil: 'Usuario',
      activo: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.modal = true;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

}
