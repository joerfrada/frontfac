import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
      location.href = '/login';
    }, 1000);
  }

}
