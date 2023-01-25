import { IModalConfig } from './../../../../data-model/types';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
//https://www.freakyjolly.com/angular-bootstrap-modal-tutorial-by-example/
// Does not work properly
@Component({
  selector: 'app-test-html-modal',
  templateUrl: './test-html-modal.component.html',
  styleUrls: ['./test-html-modal.component.css']
})
export class TestHtmlModalComponent implements OnInit {
  @Input() set modalConfig(config: IModalConfig) {
    console.log(this.modalId?.nativeElement);
    if (this.modalId?.nativeElement && config.toOpen) {
      this.open(this.modalId?.nativeElement);
      console.log('setter in TestHtmlModalComponent');
    }
    this.toOpen = config.toOpen;
  }
  toOpen: boolean = false;
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;
  @ViewChild('mymodal') modalId: ElementRef<HTMLElement>;
  constructor(
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  ngOnInit(): void {
    if (this.toOpen) {
      this.open(this.modalId?.nativeElement);
    }
    console.log('ngOnInit TestHtmlModalComponent');

  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
