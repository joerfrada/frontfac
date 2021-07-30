import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.scss']
})
export class GradosComponent implements OnInit {

  modal: any;
  title: string = "Crear";

  varhistorial: any = [
    {
      grado_id: 1,
      grado: "Grado 1",
      descripcion: "Descripción 1",
      duracion: "2 días",
      nivel: "Nivel 1",
      gradoprev: "Grado Previo 1",
      categoria: "Categoría 1",
      activo: false
    },
    {
      grado_id: 2,
      grado: "Grado 2",
      descripcion: "Descripción 2",
      duracion: "4 días",
      nivel: "Nivel 2",
      gradoprev: "Grado Previo 2",
      categoria: "Categoría 2",
      activo: true
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
