import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageFCtrl = new FormControl('');
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void { }

  submitMsg() {
    console.log('Msg Submitted =>', this.messageFCtrl.value);
    this.closeChatViaParent();
  }
  closeChatViaParent(): void {
    this.router.navigate(
      [
        // NOTE: No relative-path navigation is required because we are accessing
        // the parent's "activatedRoute" instance. As such, this will be executed
        // as if we were doing this in the parent view component.
        {
          outlets: {
            chat: null,
          },
        },
      ],
      {
        relativeTo: this.route.parent, // <--- PARENT activated route.
      }
    );
  }

}
