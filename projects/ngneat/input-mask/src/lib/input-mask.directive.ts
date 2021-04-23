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
  /**
   *Helps you to create input-mask based on https://github.com/RobinHerbots/Inputmask
   *Supports form-validation out-of-the box.
   *Visit https://github.com/ngneat/input-mask for more info.
   */
  @Input() inputMask: Inputmask.Options = {};
  inputMaskPlugin: Inputmask.Instance | undefined;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (Object.keys(this.inputMask).length) {
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

export const createMask = (
  options: string | Inputmask.Options
): Inputmask.Options =>
  typeof options === 'string' ? { mask: options } : options;
