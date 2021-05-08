import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  createComponentFactory,
  Spectator,
  typeInElement,
} from '@ngneat/spectator';
import { createMask } from './input-mask.directive';
import { InputMaskModule } from './input-mask.module';

@Component({
  template: `
    <input class="input" [inputMask]="dateMask" [formControl]="dateFC" />
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
}

describe('HighlightDirective', () => {
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
    const input = spectator.query('.input') as HTMLInputElement;
    spectator.typeInElement('28021992', '.input');
    expect(input.value).toEqual('28/02/1992');
  });

  it('should update the control value as per mask parser', () => {
    spectator.typeInElement('28021992', '.input');
    expect(spectator.component.dateFC.value).toEqual(new Date(1992, 1, 28));
  });
});
