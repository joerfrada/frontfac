import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[notnegative]'
})
export class NotnegativeDirective {

  constructor() { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    return event.charCode >= 48;
  }
}
