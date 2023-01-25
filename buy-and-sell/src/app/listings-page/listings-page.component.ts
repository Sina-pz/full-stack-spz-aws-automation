import { Component, OnInit } from '@angular/core';
import { Listing } from '../data-model/types';
import { ListingsService } from '../services/data-service/listings.service';


@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService,
  ) { }

  ngOnInit(): void {
    this.listingsService.getListings()
      .subscribe(listings => this.listings = listings);
  }

}
