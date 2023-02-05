// currency input directive
import { Directive, Input } from '@angular/core';
import { Regexs } from '../shared/constants';

@Directive({
  selector: '[ci]',
  host: {
    '(keyup)': 'capitalize($event)',
  },
})
export class ciDirective {
  constructor() {}

  validChars = ['V', 'E', 'J', 'P'];
  // capitalize first character
  capitalize(event: KeyboardEvent) {
    let input = event.target as HTMLInputElement;

    if (input.value.length == 0) return;

    input.value = this.validateFirtsChar(input.value);
    input.value = this.validatePattern(input.value);

    event.target?.dispatchEvent(new Event('input'));
  }

  validatePattern(value: string) {
    let pattern = Regexs.regexCi;
    if (!pattern.test(value) && value[0] != 'P') {
      value = value[0] + value.slice(1).replace(/\D/g, '');
    }
    return value;
  }

  // validate first character
  validateFirtsChar(value: string) {
    if (!this.validChars.includes(value[0]?.toUpperCase())) {
      if (!isNaN(Number(value[0]))) {
        value = 'V' + value;
      } else {
        value = 'V' + value.slice(1);
      }
    } else {
      value = value[0].toUpperCase() + value.slice(1);
    }
    return value;
  }
}
