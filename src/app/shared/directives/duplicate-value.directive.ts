import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function duplicateValueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const duplicatedValues = findDuplicates(control.value);
    return duplicatedValues.length > 0
      ? { duplicatedValues: { value: control.value } }
      : null;
  };
}

function findDuplicates(arr: string[]): string[] {
  const duplicates: string[] = arr.reduce(
    (acc: string[], item: string, index: number) => {
      if (arr.indexOf(item) !== index && !acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );
  return duplicates;
}

@Directive({
  selector: '[appDuplicateValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DuplicateValidatorDirective,
      multi: true,
    },
  ],
})
export class DuplicateValidatorDirective implements Validator {
  // @Input('appDuplicateValue') appDuplicateValue: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return duplicateValueValidator()(control);
  }
}
