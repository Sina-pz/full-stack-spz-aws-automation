import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function createPasswordsStrengthValidator(): ValidatorFn {
  // factory function : return function
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumericCase = /[0-9]+/.test(value);

    const passwordValid = hasLowerCase && hasUpperCase && hasNumericCase;

    // return !passwordValid ? {require: true}
    return !passwordValid ? { passwordStrength: true } : null;
  };
}