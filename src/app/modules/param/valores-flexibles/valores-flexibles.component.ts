import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valores-flexibles',
  templateUrl: './valores-flexibles.component.html',
  styleUrls: ['./valores-flexibles.component.scss']
})
export class ValoresFlexiblesComponent implements OnInit {

  modal: any;
  valorModal: any;

  varhistorial: any = [
    {
      nombre_id: 1,
      orden: 1,
      nombre_lista: "Nombre 1",
      descripcion: "Descripcion 1",
      nombre_padre: null,
      activo: true
    },
    {
      nombre_id: 2,
      orden: 2,
      nombre_lista: "Nombre 2",
      descripcion: "Descripcion 2",
      nombre_padre: 1,
      activo: false
    },
  ];

  varvalor: any = [
    {
      lista_id: 1,
      nombre_lista_id: 1,
      lista_dinamica: "Lista 1",
      descripcion: "Descripcion 1",
      lista_padre: null,
      activo: true
    },
    {
      lista_id: 2,
      nombre_lista_id: 1,
      lista_dinamica: "Lista 2",
      descripcion: "Descripcion 2",
      lista_padre: null,
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

  openValor() {
    this.valorModal = true;
  }

  closeValorModal(bol: any) {
    this.valorModal = bol;
  }

}
