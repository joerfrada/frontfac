import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-select-list-modal',
  templateUrl: './select-list-modal.component.html',
  styleUrls: ['./select-list-modal.component.scss']
})
export class SelectListModalComponent implements OnInit {

  @Input() show?: Boolean;
  @Input() title?: String;
  @Input() size?: String;
  @Input() item1?: any;
  @Input() item2?: any;
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  selectedToAdd: any;
  selectedToRemove: any;
  selectedItems: any = [];

  constructor() { }

  ngOnInit(): void { }

  closeModal() {
    this.close.emit(false);
  }

  btnRight() {
    this.selectedItems = this.selectedItems.concat(this.selectedToAdd);
    this.item1 = this.item1.filter((selectedData: any) => {
      return this.selectedItems.indexOf(selectedData) < 0;
    });
    this.selectedToAdd = [];
  }

  btnLeft() {
    this.item1 = this.item1.concat(this.selectedToRemove);
    this.selectedItems = this.selectedItems.filter((selectedData: any) => {
      return this.item1.indexOf(selectedData) < 0;
    });
    this.selectedToRemove = [];
  }

  saveModal() {
    this.output.emit(this.selectedItems.map((e: any) => e.detalle).join(", "));
    this.closeModal();
  }
}
