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
  ipAddressMask: Inputmask.Options = { alias: 'ip' };
  ipAddress = new FormControl('', inputMaskValidator(this.ipAddressMask));
}
