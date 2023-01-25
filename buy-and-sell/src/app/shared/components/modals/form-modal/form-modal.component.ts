import { IModalConfig } from '../../../../data-model/types';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// It is not reusable form modal because when we close it we still can see the html tags and component there! and next time if we use it for another
// need to 
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit, AfterViewInit {

  @Input() set modalConfig(config: IModalConfig) {
    console.log('setter in obj', !config.toOpen);
    if (this.modalToOpen?.nativeElement) {
      if (config.toOpen) {
        this.modalToClose?.nativeElement.click();
      } else if (!config.toOpen) {
        this.modalToOpen?.nativeElement.click();
      }
    }
    this.title = config?.title;
  }
  title: string;
  @ViewChild('openModalId', { static: false }) modalToOpen: ElementRef<HTMLElement>;
  @ViewChild('closeModalId', { static: false }) modalToClose: ElementRef<HTMLElement>;


  constructor(private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.route.snapshot.data.pipe(tap(data => {
    //   console.log('LoginFormModalComponent', data['isClicked']);
    // }), map(data => data['isClicked'])).subscribe(isClicked => {
    //   this.isClicked = isClicked;
    // })
  }
  ngAfterViewInit(): void {
    // if (this.isClicked) {
    //   this.modalToOpen.nativeElement.click();
    // }
    // console.log('LoginFormModalComponent', this.isClicked);
    // this.route.paramMap.subscribe(params => {
    //   console.log('subscribed', params["isClicked"]);
    // })
  }
  // onSubmit(formData: Partial<User>) {
  //   this.modalToClose?.nativeElement.click();
  //   this.loggedInUser.emit(formData);
  // }
  // onClose() {
  //   console.log(' close modal');
  //   this.modalToClose?.nativeElement.click();
  // }
  // just for test


}
