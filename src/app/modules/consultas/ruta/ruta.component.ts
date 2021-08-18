import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  varhistorial: any = [];

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

  datasource = {
    'id': '1',
    'name': 'Cargo (Cargo 1)',
    'children': [
      { 
        'id': '2',
        'name': 'Cargo (Cargo 2)',
        'parent_id': '1',
        'children': [
          { 
            'name': 'Cargo (Cargo 3)',
            'parent_id': '2'
          },
          { 
            'name': 'Cargo (Cargo 4)',
            'parent_id': '2'
          }
        ]
      },
      { 
        'id': '3',
        'name': 'Cargo (Cargo 5)',
        'parent_id': '1'
      },
      { 
        'id': '4',
        'name': 'Cargo (Cargo 6)',
        'children': [
          { 
            'name': 'Cargo (Cargo 7)',
            'parent_id': '4'
          },
          { 
            'name': 'Cargo (Cargo 8)',
            'parent_id': '4'
          }
        ]
      }
    ]
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filter();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  filter() {
    this.varhistorial = [
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
    this.consultaModal = false;
    setTimeout(() => { this.orgchartinit(); }, 300);
  }

  closeWorkflowModal(bol: any) {
    this.workflowModal = bol;
    this.reload();
  }

  orgchartinit() {
    let nodeTemplate = function(data: any) {
      return `
        <div class="title">
          ${data.name}
          <i class="icon fas fa-1mx fa-arrow-circle-right pointer noselect"></i>
        </div>
      `;
    };
    $('#chart-container').orgchart({
      'data' : this.datasource,
      'chartClass': 'orgchart-demo',
      'nodeTemplate': nodeTemplate,
      'createNode': function($node: any, data: any) {
        $node.on('click', function() {
          alert('You selected ' + data.name);
        });
      }
    });
  }
}
