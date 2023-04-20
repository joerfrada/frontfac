import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ver-modal',
  templateUrl: './ver-modal.component.html',
  styleUrls: ['./ver-modal.component.scss']
})
export class VerModalComponent implements OnInit {

  @Input() title?: String;
  @Input() items?: any;
  @Input() titles?: any;
  @Input() show?: Boolean;
  @Input() size?: String;
  @Output() close = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

  format(data: any) {
    const text = data.split(/(?=[A-Z])/).join(". ");
    return text.toUpperCase();
  }

}
