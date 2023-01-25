import { ErrMessageComponent } from './components/err-message/err-message.component';
import { TestCompModalComponent } from './components/modals/test-comp-modal/test-comp-modal.component';
import { TestHtmlModalComponent } from './components/modals/test-html-modal/test-html-modal.component';
import { OnlyOneErrorPipe } from './pipes/only-one-error.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ChatComponent } from './components/chat/chat.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { FormModalComponent } from './components/modals/form-modal/form-modal.component';
import { ModalComponent } from './components/modals/modal/modal.component';

const sharedComponents = [ChatComponent, LoadingComponent, FormModalComponent, ModalComponent, TestHtmlModalComponent, TestCompModalComponent, SafeUrlPipe, OnlyOneErrorPipe, ErrMessageComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: sharedComponents,
  exports: sharedComponents,
  providers: []
})
export class SharedModule { }