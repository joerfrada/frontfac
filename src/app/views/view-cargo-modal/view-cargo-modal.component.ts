import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'viewcargo-modal',
  templateUrl: './view-cargo-modal.component.html',
  styleUrls: ['./view-cargo-modal.component.scss']
})
export class ViewCargoModalComponent implements OnInit {

  @Input() show?: Boolean;
  @Input() title?: String;
  @Input() size?: String;
  @Input() data?: String;
  @Output() close = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

}
