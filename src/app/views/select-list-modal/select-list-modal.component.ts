import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

}
