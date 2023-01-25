import { LoadingStoreService } from './../../../services/stores/loadingstore.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  // Detecting Route Transitions and Lazy Loading
  @Input()
  routing: boolean = false;
  @Input()
  detectRoutingOnGoing: boolean = true;

  // displaying loading indicator while router transition is ongoing

  constructor(public loadingService: LoadingStoreService, private router: Router) { }

  ngOnInit() {
    // if this pro is true; every navigation of router is gonna trigger the loading indicator with this logic
    //
    if (this.detectRoutingOnGoing) {
      this.router.events.subscribe((event) => {
        if (
          event instanceof NavigationStart ||
          // An event triggered when a route has been lazy loaded.
          event instanceof RouteConfigLoadStart
        ) {
          this.loadingService.setIsLoading(true);

        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd
        ) {
          this.loadingService.setIsLoading(false);
        }
      });
    }
  }

}
