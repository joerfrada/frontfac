import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss']
})
export class DetalleModalComponent implements OnInit {

  @Input() title?: String;
  @Input() show?: Boolean;
  @Input() size?: String;
  @Output() close = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

}
