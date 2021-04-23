import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'input-mask';

  dateInputMask = createMask({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
  });
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
  });
  licensePlateInputMask = createMask('[9-]AAA-999');

  ipAddressMask = createMask({ alias: 'ip' });
  ipAddress = new FormControl('');
}
