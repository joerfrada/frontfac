import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'piramide-modal',
  templateUrl: './piramide-modal.component.html',
  styleUrls: ['./piramide-modal.component.scss']
})
export class PiramideModalComponent implements OnInit {

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
