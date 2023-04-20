import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-route-modal',
  templateUrl: './select-route-modal.component.html',
  styleUrls: ['./select-route-modal.component.scss']
})
export class SelectRouteModalComponent implements OnInit {

  @ViewChild('input', { static: false }) private input!: ElementRef;

  @Input() title?: string;
  @Input() show?: Boolean;
  @Input() array?: any;
  @Input() arrayTemp?: any;
  @Input() size?: string = 'modal-md';
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

  clickData(data: any) {
    this.output.emit(data);
  }

  search(e: any) {
    let filter = e.target.value.trim().toLowerCase();
    if (filter.length == 0) {
      this.array = this.arrayTemp;
    }
    else {
      this.array = this.arrayTemp.filter((item: any) => {
        if (item.tipo_ruta.toString().toLowerCase().indexOf(filter) !== -1 ||
            item.tipo_categoria.toString().toLowerCase().indexOf(filter) !== -1 ||
            item.especialidad.toString().toLowerCase().indexOf(filter) !== -1 ||
            item.area.toString().toLowerCase().indexOf(filter) !== -1) {
              return true;
            }
        return false;
      });
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.array = this.arrayTemp;
    }
  }

}
