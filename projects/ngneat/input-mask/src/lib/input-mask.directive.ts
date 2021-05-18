import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
import Inputmask from 'inputmask';

@Directive({
  selector: '[inputMask]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputMaskDirective,
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputMaskDirective,
      multi: true,
    },
  ],
})
export class InputMaskDirective<T = any>
  implements Validator, AfterViewInit, ControlValueAccessor {
  /**
   *Helps you to create input-mask based on https://github.com/RobinHerbots/Inputmask
   *Supports form-validation out-of-the box.
   *Visit https://github.com/ngneat/input-mask for more info.
   */
  @Input() inputMask: InputmaskOptions<T> = {};
  inputMaskPlugin: Inputmask.Instance | undefined;

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput = (_: any) => {};

  get inputMaskOptions(): Inputmask.Options {
    const { parser, ...options } = this.inputMask;
    return options;
  }

  writeValue(value: string): void {}

  registerOnChange(fn: (_: T | null) => void): void {
    const parser = this.inputMask.parser;
    this.onInput = (value) => {
      fn(parser ? parser(value) : value);
    };
  }

  registerOnTouched(fn: any): void {}

  ngAfterViewInit() {
    if (Object.keys(this.inputMask).length) {
      this.inputMaskPlugin = new Inputmask(this.inputMaskOptions).mask(
        this.elementRef.nativeElement
      );
    }
  }

  validate(): { [key: string]: any } | null {
    return this.inputMaskPlugin && this.inputMaskPlugin.isValid()
      ? null
      : { inputMask: false };
  }
}

export const createMask = <T>(
  options: string | InputmaskOptions<T>
): InputmaskOptions<T> =>
  typeof options === 'string' ? { mask: options } : options;

export type InputmaskOptions<T> = Inputmask.Options & {
  parser?: (value: any) => T;
};
