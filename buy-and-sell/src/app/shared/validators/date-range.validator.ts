import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
// form level validator
export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const startDate: Date = form.get("promoStartAt").value;
    const endDate: Date = form.get("promoEndAt").value;
    // we need to check it only the date is valid
    if (startDate && endDate) {
      const isRangeValid = endDate.getTime() - startDate.getTime() > 0;
      // export a flag
      console.log("valid form", isRangeValid);

      return isRangeValid ? null : { promoPeriod: true };
    }
    return null;
  };
}
