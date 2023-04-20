import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-grado-modal',
  templateUrl: './select-grado-modal.component.html',
  styleUrls: ['./select-grado-modal.component.scss']
})
export class SelectGradoModalComponent implements OnInit {

  @ViewChild('input', { static: false }) private input!: ElementRef;

  @Input() title?: string;
  @Input() show?: Boolean;
  @Input() array?: any;
  @Input() arrayTemp?: any;
  @Input() size?: string = 'modal-md';
  @Input() IsLectura?: Boolean;
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

  search(e: any) {
    let filter = e.target.value.trim().toLowerCase();
    if (filter.length == 0) {
      this.array = this.arrayTemp;
    }
    else {
      this.array = this.arrayTemp.filter((item: any) => {
        if (item.descripcion.toString().toLowerCase().indexOf(filter) !== -1 ||
            item.sigla.toString().toLowerCase().indexOf(filter) !== -1) {
              return true;
        }
        return false;
      });
    }
  }

  checkAllCheckBox(ev: any) {
		this.array.forEach((x: any) => x.checked = ev.target.checked)
	}

  isAllCheckBoxChecked() {
		return this.array.every((x: any) => x.checked);
	}

  save() {
    this.output.emit(this.array);
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.array = this.arrayTemp;
    }
  }
}
