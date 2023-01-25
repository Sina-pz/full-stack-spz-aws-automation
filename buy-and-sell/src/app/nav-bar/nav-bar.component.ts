import { MessageStoreService } from './../services/stores/msgStore.service';
import { Observable, Subject } from 'rxjs';
import { AuthStoreService } from './../auth/custom/auth-store.service';
import { IModalConfig, User } from './../data-model/types';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
// to trigger input change detection we need to change object in parent comp
// and also it child component there should be 

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Output() loggedInUser = new EventEmitter<Partial<User>>();
  // isLoggedIn: boolean;
  modalConfig: IModalConfig = { title: 'Login', toOpen: false };
  // private unSubscribe$ = new Subject();

  constructor(public authStore: AuthStoreService, private cdr: ChangeDetectorRef) {
    // this.authStore.isLoggedIn$.pipe(takeUntil(this.unSubscribe$)).subscribe(
    //   isLoggedIn => {
    //     this.isLoggedIn = isLoggedIn
    //   }
    // )
    // this.cdr.detectChanges();
  }

  ngOnInit(): void {
    // this.msgStoreSrv.messages$.subscribe(val => {
    //   console.log('in NavBarComponent msgStoreSrv', val);
    // });
  }


  onClickToLogIn() {
    this.modalConfig = { ...this.modalConfig, toOpen: false };
    this.cdr.detectChanges();
  }
  onClickToLogOut() {
    this.modalConfig = { ...this.modalConfig, toOpen: true };
    this.onSubmit(null);
    this.cdr.detectChanges();
  }

  onSubmit(loggedInUser: Partial<User>) {
    console.log('Submitted nav', loggedInUser);
    this.loggedInUser.emit(loggedInUser);
    this.onLoginFormClose();
  }

  ngOnDestroy(): void {
    // this.unSubscribe$.next();
    // this.unSubscribe$.complete();
  }
  onLoginFormClose() {
    console.log('onLoginFormClose Nav');
    this.modalConfig = { ...this.modalConfig, toOpen: true };
  }

}
