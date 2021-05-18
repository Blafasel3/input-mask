import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { createMask } from './input-mask.directive';
import { InputMaskModule } from './input-mask.module';

@Component({
  template: `
    <input class="date" [inputMask]="dateMask" [formControl]="dateFC" />
    <input class="ip" [inputMask]="ipAddressMask" [formControl]="ipFC" />
  `,
})
class TestComponent {
  dateMask = createMask({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
    parser: (value: string) => {
      const values = value.split('/');
      const year = +values[2];
      const month = +values[1] - 1;
      const date = +values[0];
      return new Date(year, month, date);
    },
  });
  dateFC = new FormControl('');

  ipAddressMask = createMask({ alias: 'ip' });
  ipFC = new FormControl('');
}

describe('InputMaskDirective', () => {
  let spectator: Spectator<TestComponent>;
  const createComponent = createComponentFactory({
    component: TestComponent,
    imports: [ReactiveFormsModule, InputMaskModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should get the instance', () => {
    const instance = spectator.component;
    expect(instance).toBeDefined();
  });

  it('should update the UI value as per mask', () => {
    const input = spectator.query('.date') as HTMLInputElement;
    spectator.typeInElement('28021992', '.date');
    expect(input.value).toEqual('28/02/1992');
    spectator.typeInElement('111111111111', '.ip');
    expect(spectator.component.ipFC.value).toEqual('111.111.111.111');
  });

  it('should update the control value as per mask parser', () => {
    spectator.typeInElement('28021992', '.date');
    expect(spectator.component.dateFC.value).toEqual(new Date(1992, 1, 28));
  });

  it('should make form control invalid for non-compliant value', () => {
    spectator.typeInElement('abcd', '.date');
    expect(spectator.component.dateFC.invalid).toBeTrue();
    spectator.typeInElement('abcd', '.ip');
    expect(spectator.component.ipFC.invalid).toBeTrue();
  });
});
