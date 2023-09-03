import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version = "v.1.0.1";
  year: any;
  
  constructor() { }

  ngOnInit(): void {
    const fecha = new Date();

    this.year = fecha.getFullYear();
  }

}
