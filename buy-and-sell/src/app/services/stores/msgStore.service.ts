import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class MessageStoreService {
  private messagesSubject$ = new BehaviorSubject<string[]>(undefined);
  setErrMessage(messages: string[]) {
    this.messagesSubject$.next(messages);
  }
  get messages$(): Observable<string[]> {
    return this.messagesSubject$.asObservable().pipe(filter(messages => (messages && messages.length > 0)));
  }

  getMessagesValue(): string[] {
    return this.messagesSubject$.getValue();
  }

}
