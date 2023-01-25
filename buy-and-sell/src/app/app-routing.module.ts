import { MainAppComponent } from './main-app/main-app.component';
import { CustomPreloadingStrategy } from './services/logic-service/custom-preloading.strategy';
import { ChatComponent } from './shared/components/chat/chat.component';
import { CanLoadAuthGuard } from './auth/can-load-auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { ListingDetailPageComponent } from './listing-detail-page/listing-detail-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { EditListingPageComponent } from './edit-listing-page/edit-listing-page.component';
import { MyListingsPageComponent } from './my-listings-page/my-listings-page.component';
import { NewListingPageComponent } from './new-listing-page/new-listing-page.component';
import { FormModalComponent } from './shared/components/modals/form-modal/form-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/listings', pathMatch: 'full' },
  { path: 'listings', component: ListingsPageComponent, pathMatch: 'full' },
  { path: 'home', component: MainAppComponent },
  { path: 'listings/:id', component: ListingDetailPageComponent },
  { path: 'contact/:id', component: ContactPageComponent },
  { path: 'edit-listing/:id', component: EditListingPageComponent },
  { path: 'my-listings', component: MyListingsPageComponent },
  { path: 'new-listing', component: NewListingPageComponent },
  { path: "login", component: FormModalComponent },
  {
    path: 'routers/courses', loadChildren: () => import('./router/router.module').then(m => m.CourseModule),
    // just for lazy loading and through this it can not be loaded unlike can activate
    canLoad: [CanLoadAuthGuard],
    // canLoad: [CanLoadAuthGuard],
    // just if user logged in
    // data: {
    //   // if we do not want to preloaded => true
    //   // CustomPreloadingStrategy
    //   preload: false,
    // },
  },
  {
    path: 'helpdesk-chat',
    component: ChatComponent,
    outlet: "chat",
  },
  {
    path: '**',
    redirectTo: "/listings"
  }
];

// preLoad strategies: angular-router in depth: section 5:
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // noPreloading by default, preload
    // preloadingStrategy: PreloadAllModules, // does not work with canLoad!
    // preloadingStrategy: CustomPreloadingStrategy
    scrollPositionRestoration: 'enabled',
    // no need to route.parent.paramMap
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected', // ../ instead of ./ very confusing but this fixe ir
    // malformedUriErrorHandler(error, urlSerializer, url) {
    //     return urlSerializer.parse("/page-not-found")
    // },
    // invalid url that browser could not pars it
  })],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard, CustomPreloadingStrategy]
})
export class AppRoutingModule { }
