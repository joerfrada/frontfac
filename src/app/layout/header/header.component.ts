import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleSideBar.emit();
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
      location.href = '/login';
    }, 10);
  }

}
