import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'workflow-modal',
  templateUrl: './workflow-modal.component.html',
  styleUrls: ['./workflow-modal.component.scss']
})
export class WorkflowModalComponent implements OnInit {

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
