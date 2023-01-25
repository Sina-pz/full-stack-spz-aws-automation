import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageStoreService } from './../../../services/stores/msgStore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-err-message',
  templateUrl: './err-message.component.html',
  styleUrls: ['./err-message.component.css']
})
export class ErrMessageComponent implements OnInit {
  errMessages$: Observable<string[]>;
  showMessages = false;
  constructor(public msgStoreService: MessageStoreService) {
    this.errMessages$ = this.msgStoreService.messages$.pipe(tap(() => this.showMessages = true));
  }

  ngOnInit(): void {
    // this.msgStoreService.messages$.subscribe((val) => {
    //   console.log('ErrMessageComponent', val);
    // })
  }
  close() {
    this.showMessages = false;
  }
}
