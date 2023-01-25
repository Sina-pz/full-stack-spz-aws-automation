import { LoadingStoreService } from './services/stores/loadingstore.service';
import { MessageStoreService } from './services/stores/msgStore.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { ListingDetailPageComponent } from './listing-detail-page/listing-detail-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MyListingsPageComponent } from './my-listings-page/my-listings-page.component';
import { NewListingPageComponent } from './new-listing-page/new-listing-page.component';
import { EditListingPageComponent } from './edit-listing-page/edit-listing-page.component';
import { ListingDataFormComponent } from './listing-data-form/listing-data-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './auth/custom/login-form/login-form.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainAppComponent } from './main-app/main-app.component';


@NgModule({
  declarations: [
    AppComponent,
    ListingsPageComponent,
    ListingDetailPageComponent,
    ContactPageComponent,
    MyListingsPageComponent,
    NewListingPageComponent,
    EditListingPageComponent,
    ListingDataFormComponent,
    NavBarComponent,
    LoginFormComponent,
    MainAppComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MessageStoreService, LoadingStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
