import { Listing } from './../../data-model/types';
import { tap } from 'rxjs/operators';
import { FakeListings } from './fake-data';
import { TestBed } from '@angular/core/testing';
import { ListingsService } from './listings.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpErrorResponse } from '@angular/common/http';
// test: getListings && getListingById && editListing
fdescribe('ListingsService', () => {
  let service: ListingsService,
    httpTestingController: HttpTestingController;
  // Controller to be injected into tests, that allows for mocking and flushing of requests.
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // mock HttpClient
      providers: [ListingsService]
    });
    service = TestBed.inject(ListingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  fit('should retrieve all listings', () => {
    expect(service).toBeTruthy('service is not loaded');
    service.getListings().subscribe(listings => {
      console.log(listings);
      expect(listings).toBeTruthy('listings is not loaded');
      expect(listings.length).toEqual(3, 'The Length of Listing is not equal 3');
      const course = listings.find(course => course.id === '123');
      expect(course.name).toEqual('Old Boat');
    });
    const req = httpTestingController.expectOne('/api/listings');
    expect(req.request.method).toEqual('GET', 'Method is not GET');
    req.flush(FakeListings);
  });

  fit('should get Listing by id', () => {
    service.getListingById('345').pipe(tap(console.log)).subscribe(
      listing => {
        expect(listing).toBeTruthy();
        expect(listing.id).toEqual('345');
      }
    );
    const req = httpTestingController.expectOne('/api/listings/345');
    expect(req.request.method).toEqual("GET");
    req.flush(FakeListings[1]);
  });

  fit('should save the listing data', () => {
    const changes: Partial<Listing> =
      { id: '123', name: 'Old Boat NEW', description: '', price: 10 };

    service.editListing('123', 'Old Boat NEW', '', 10).subscribe(listing => {
      expect(listing.id).toBe('123');
    });
    const req = httpTestingController.expectOne('/api/listings/123');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.name).toEqual(
      changes.name
    );
    // we are going to simulate the response of httpRequest
    // the server return in response to a put request
    req.flush({
      ...FakeListings[0],
      ...changes,
    });
  });

  fit("should give an error if save listing fails", () => {
    const changes: Partial<Listing> =
      { id: '123', name: 'Old Boat NEW', description: '', price: 10 };

    service.editListing('123', 'Old Boat NEW', '', 10).subscribe(
      // the success part should not be executed and we gonna add fail to fail the test if we receive anything in this section
      () => fail('the save listing operation should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne('/api/listings/123');

    expect(req.request.method).toEqual("POST");
    // we are going to fail the request
    // we can pass null or undefine but we send body and etc
    req.flush("Save listing failed", {
      status: 500,
      statusText: "Internal Server Error",
    });
  });


  // an example for testing params
  // it("should find a list of lessons", () => {
  //   service.findLessons(12).subscribe((lessons) => {
  //     // receive at least some value
  //     expect(lessons).toBeTruthy();

  //     expect(lessons.length).toBe(3);
  //   });
  //   // it s gonna be complicated to specific exact url
  //   // const reqq = httpTestingController.expectOne(
  //   //   "/api/lessons?courseId=12&pageNumber=0"
  //   // );

  //   const req = httpTestingController.expectOne(
  //     // this going to return true or false when we got maching ...
  //     (req) => req.url == "/api/lessons"
  //     // we can also check body , header , parameter req.body req.header
  //   );

  //   expect(req.request.method).toEqual("GET");
  //   expect(req.request.params.get("courseId")).toEqual("12");
  //   expect(req.request.params.get("filter")).toEqual("");
  //   expect(req.request.params.get("sortOrder")).toEqual("asc");
  //   expect(req.request.params.get("pageNumber")).toEqual("0");
  //   expect(req.request.params.get("pageSize")).toEqual("3");
  //   // export const LESSONS = {

  //   //   1: {
  //   //     id: 1,
  //   req.flush({
  //     payload: findLessonsForCourse(12).slice(0, 3),
  //   });
  // });

  afterEach(() => {
    httpTestingController.verify();
  });
});
