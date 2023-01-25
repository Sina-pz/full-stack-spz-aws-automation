import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, ActivatedRoute, Route } from '@angular/router';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  // router is a long-run observable and we need to stop it 
  // like 
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data["preload"]) {
      // returning result of this observable here
      return load();
    } else {
      return of(null)
      // then complete
    }
  }

}