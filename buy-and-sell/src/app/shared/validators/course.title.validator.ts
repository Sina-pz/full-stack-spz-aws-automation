
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { Course } from "src/app/data-model/types";

// export function courseTitleAsyncValidator(course: CoursesService): AsyncValidatorFn {
//   // this courseTitleValidator() is used to create an instansiat of AsyncValidatorFn
//   // we need backend call so we need :: backend service
//   return (control: AbstractControl) => {
//     //  (control: AbstractControl): ValidationErrors | null { ths type of output is not assignable to
//     return course.findAllCourses().pipe(
//       map((courses: Course[]) => {
//         const foundCourse = courses.find(
//           (course: Course) =>
//             course.description.toLowerCase() === control.value.toLowerCase()
//         );
//         // usage: control like title.errors.titleExists ()
//         return foundCourse ? { title1Exists: true } : null;
//       })
//     );
//   };
// }
