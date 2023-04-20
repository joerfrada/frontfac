import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-table-checkbox-modal',
  templateUrl: './table-checkbox-modal.component.html',
  styleUrls: ['./table-checkbox-modal.component.scss']
})
export class TableCheckboxModalComponent implements OnInit {

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
    let arr = this.array.filter((x: any) => x.checked == true);
    this.output.emit(arr);
  }

}
