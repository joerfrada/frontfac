import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.scss']
})
export class RequerimientosComponent implements OnInit {

  modal: any;

  varhistorial: any = [
    {
      requerimiento_id: 1,
      requerimiento: "Requerimiento 1",
      categoria: "Categoría 1",
      especialidad: "Especialidad 1",
      grado: "Grado 1",
      activo: true
    },
    {
      requerimiento_id: 2,
      requerimiento: "Requerimiento 2",
      categoria: "Categoría 2",
      especialidad: "Especialidad 2",
      grado: "Grado 2",
      activo: false
    },
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
