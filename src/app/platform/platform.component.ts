import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  modal: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  openModal() {
    this.modal = true;
  }
  
  closeModal(bol: any) {
    this.modal = bol;
  }

}
