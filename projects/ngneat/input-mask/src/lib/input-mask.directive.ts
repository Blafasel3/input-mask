import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import Inputmask from 'inputmask';

@Directive({
  selector: '[inputMask]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputMaskDirective,
      multi: true,
    },
  ],
})
export class InputMaskDirective implements Validator, AfterViewInit {
  @Input() inputMask: string | Inputmask.Options = '';
  @Input() inputMaskOptions: Inputmask.Options = {};
  inputMaskPlugin: Inputmask.Instance | undefined;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.inputMask) {
      this.inputMask =
        typeof this.inputMask === 'string'
          ? { mask: this.inputMask, ...this.inputMaskOptions }
          : this.inputMask;
      this.inputMaskPlugin = new Inputmask(this.inputMask).mask(
        this.el.nativeElement
      );
    }
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return Inputmask.isValid(control.value, this.inputMask as Inputmask.Options)
      ? null
      : { inputMask: false };
  }
}
