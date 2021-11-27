import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'viewcargo-modal',
  templateUrl: './view-cargo-modal.component.html',
  styleUrls: ['./view-cargo-modal.component.scss']
})
export class ViewCargoModalComponent implements AfterViewInit {

  @Input() show?: Boolean;
  @Input() title?: String;
  @Input() size?: String;
  @Output() close = new EventEmitter<Boolean>();

  constructor() {}

  ngAfterViewInit() {}

  closeModal() {
    this.close.emit(false);
  }

}
