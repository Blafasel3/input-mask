import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { inputMaskValidator } from '@ngneat/input-mask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'input-mask';

  dateInputMask: Inputmask.Options = {
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
  };
  currencyInputMask: Inputmask.Options = {
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
  };
  licensePlateInputMask: Inputmask.Options = {
    mask: '[9-]AAA-999',
  };

  ipAddressMask: Inputmask.Options = { alias: 'ip' };
  ipAddress = new FormControl('', inputMaskValidator(this.ipAddressMask));
}
