import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test-comp-modal',
  templateUrl: './test-comp-modal.component.html',
  styleUrls: ['./test-comp-modal.component.css']
})
export class TestCompModalComponent implements OnInit {
  @Input() my_modal_title;
  @Input() my_modal_content;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
