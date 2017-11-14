import { Directive } from '@angular/core';

/**
 * Generated class for the ShowItemDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[show-item]' // Attribute selector
})
export class ShowItemDirective {

  constructor() {
    console.log('Hello ShowItemDirective Directive');
  }

}
