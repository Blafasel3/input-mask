import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import Inputmask from 'inputmask';

@Directive({
  selector: '[inputMask]',
})
export class InputMaskDirective implements AfterViewInit {
  @Input() inputMask: string | undefined | Inputmask.Options;
  @Input() inputMaskOptions: Inputmask.Options = {};
  inputMaskPlugin: Inputmask.Instance | undefined;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.inputMask) {
      let im: Inputmask.Instance;
      switch (true) {
        case typeof this.inputMask === 'object':
          im = new Inputmask(this.inputMask as Inputmask.Options);
          break;
        default:
          im = new Inputmask(this.inputMask as string, this.inputMaskOptions);
          break;
      }
      this.inputMaskPlugin = im.mask(this.el.nativeElement);
    }
  }
}

export const inputMaskValidator = (
  mask: string | Inputmask.Options
): ValidatorFn => (control: AbstractControl): { [key: string]: any } | null => {
    mask = typeof mask === 'string' ? { mask } : mask;
    const isInputMaskValid = Inputmask.isValid(control.value, mask);
    return !isInputMaskValid ? { inputMask: { value: control.value } } : null;
  };
