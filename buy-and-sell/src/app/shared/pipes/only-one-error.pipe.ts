import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "onlyOneError",
  // PURE PIPE: if the input changed after the the pipe recompute the output; by default it is pure
  // impure pipe: compute its output with each angular change detection run
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(allErrors: any, errorsPriority: string[]): any {
    if (!allErrors) {
      return null;
    }
    let onlyOneError: any = {};
    for (let error of errorsPriority) {
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }

    return onlyOneError;
  }
}
