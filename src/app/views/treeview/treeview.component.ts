import { AfterViewInit, Component, Input } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements AfterViewInit {

  @Input() menuList: any;

  constructor() { }

  ngAfterViewInit() {
    this.menuList.forEach((x: any) => {
      $('.treeview-' + x.menu_id).addClass('is-expanded');
    });
  }

  toggleIsExpanded(id: any) {
    $('.treeview-' + id).toggleClass('is-expanded');
  }
}
