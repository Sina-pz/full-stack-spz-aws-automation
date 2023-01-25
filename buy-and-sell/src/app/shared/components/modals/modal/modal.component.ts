import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() openLabel: string = 'Open Modal';
  @Input() title: string = 'Title';
  constructor() { }

  ngOnInit(): void {
  }

}


//https://www.itsolutionstuff.com/post/how-to-use-bootstrap-modal-in-angularexample.html#:~:text=How%20to%20use%20Bootstrap%20Modal%20in%20Angular%3F%201,Bootstrap%20...%204%20Step%204%3A%20Import%20Module%20
