import { CourseComponent } from './../router/course/course.component';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

export class ConfirmExitGuard implements CanDeactivate<CourseComponent> {
  canDeactivate(component: CourseComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {

    return component.confirmExit();
  }
}