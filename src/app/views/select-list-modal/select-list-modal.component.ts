import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var swal:any;
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
  @Input() items?: any = [];
  @Input() itemsTemp?: any = [];
  @Input() selectedItems?: any = [];
  @Output() close = new EventEmitter<Boolean>();
  @Output() output = new EventEmitter<any>();

  selectedToAdd: any = [];
  selectedToRemove: any = [];
  i = 0;

  constructor() { }

  ngOnInit(): void {}

  closeModal() {
    this.close.emit(false);
  }

  search(e: any) {
    let filter = e.target.value.trim().toLowerCase();
    if (filter.length == 0) {
      this.items = this.itemsTemp;
    }
    else {
      this.items = this.itemsTemp.filter((item: any) => {
        if (item.descr.toString().toLowerCase().indexOf(filter) !== -1 ||
            item.sigla.toString().toLowerCase().indexOf(filter) !== -1) {
              return true;
            }
        return false;
      });
    }
  }

  btnRight() {
    // this.i = this.i + 1;
    // var count = $("#mySelect :selected").length;
    
    // if (this.i > 5 || count > 5) {
    //   swal({
    //     title: 'ADVERTENCIA',
    //     text: "Puede seleccionar hasta 5 opciones solamente",
    //     allowOutsideClick: false,
    //     showConfirmButton: true,
    //     type: 'warning'
    //   });
    // }
    // else {
    //   this.selectedItems = this.selectedItems.concat(this.selectedToAdd);
    //   this.items = this.items.filter((selectedData: any) => {
    //     return this.selectedItems.indexOf(selectedData) < 0;
    //   });
    //   this.selectedToAdd = [];
    // }
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
    this.output.emit(this.selectedItems);
    this.closeModal();
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.items = this.itemsTemp;
    }
  }
}
