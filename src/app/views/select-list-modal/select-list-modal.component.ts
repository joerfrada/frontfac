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
  @Input() items?: any;
  @Input() selectedItems?: any;
  @Input() index?: any
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  selectedToAdd: any;
  selectedToRemove: any;

  constructor() { }

  ngOnInit(): void {}

  closeModal() {
    this.close.emit(false);
  }

  btnRight() {
    this.selectedItems = this.selectedItems.concat(this.selectedToAdd);
    this.items = this.items.filter((selectedData: any) => {
      return this.selectedItems.indexOf(selectedData) < 0;
    });
    this.selectedToAdd = [];
  }

  btnLeft() {
    this.items = this.items.concat(this.selectedToRemove);
    this.selectedItems = this.selectedItems.filter((selectedData: any) => {
      return this.items.indexOf(selectedData) < 0;
    });
    this.selectedToRemove = [];
  }

  saveModal() {
    this.output.emit(this.selectedItems.filter((x: any) => x.indice == this.index));
    this.closeModal();
  }
}
