import { Lesson } from './../../../data-model/types';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
//TODO: reusable search component working for different module
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() title = 'All Items';
  searchResults$: Observable<any>;
  activeLesson: Lesson;
  constructor() { }

  ngOnInit(): void {
  }

}
