import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss']
})
export class RutaComponent implements OnInit {

  modal: any;
  consultaModal: any;
  especialidadModal: any;
  workflowModal: any;

  varhistorial: any = [
    {
      ruta_id: 1,
      cuerpo: "Cuerpo 1",
      especialidad: "Especialidad 1",
      activo: true
    },
    {
      ruta_id: 2,
      cuerpo: "Cuerpo 2",
      especialidad: "Especialidad 2",
      activo: true
    },
  ];

  varlinea = [
    {
      linea_id: 1,
      cargo_ruta: "Cargo 1",
      tipo_cargo: "ASDB",
      tipo_ruta: "Ruta 1",
      activo: true
    },
    {
      linea_id: 2,
      cargo_ruta: "Cargo 2",
      tipo_cargo: "ASDB",
      tipo_ruta: "Ruta 2",
      activo: true
    },
  ];

  varitem = [
    {
      id: 1,
      cuerpo: "Cuerpo 1",
      especialidad: "Especialidad 1"
    },
    {
      id: 2,
      cuerpo: "Cuerpo 2",
      especialidad: "Especialidad 2"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aqui carga 
  }

  openModal() {
    this.modal = true;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  openConsulta() {
    this.consultaModal = true;
  }

  closeConsultaModal(bol: any) {
    this.consultaModal = bol;
  }

  openEspecialidad() {
    this.especialidadModal = true;
  }

  closeEspecialidadModal(bol: any) {
    this.especialidadModal = bol;
  }

  openWorkflow() {
    this.workflowModal = true;
  }

  closeWorkflowModal(bol: any) {
    this.workflowModal = bol;
  }

}
