import { MessageStoreService } from './services/stores/msgStore.service';
import { LoadingStoreService } from './services/stores/loadingstore.service';
import { AuthStoreService } from './auth/custom/auth-store.service';
import { User } from './data-model/types';
import { Component, OnInit } from '@angular/core';
// TODO: find spinning but first fix edit modal form
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'Full Stack Angular features';
  constructor(private authStore: AuthStoreService, private msgStoreSrv: MessageStoreService) {
  }
  ngOnInit(): void {
    console.log('App Com val', this.msgStoreSrv.getMessagesValue());
    this.msgStoreSrv.messages$.subscribe(val => {
      console.log('in AppComponent msgStoreSrv', val);
    });
  }

  onLogClick() {
    // const isClicked = true;
    // this.router.navigate(["login", isClicked], { relativeTo: this.route.parent });
  }
  onLogin(loggedInUser: Partial<User>) {
    if (loggedInUser) {
      this.authStore.login(loggedInUser.email, loggedInUser.password).subscribe({
        next: (user: User) => {
          console.log(' suc', user);
          this.authStore.setUser(user);
        },
        error: (err) => {
          alert("Login failed!")
        }
      })
    } else if (loggedInUser === null) {
      console.log(' null');
      this.authStore.setUser(null);
    }

  }
}
