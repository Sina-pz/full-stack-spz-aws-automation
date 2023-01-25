import { User } from './../../../data-model/types';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() submittedForm = new EventEmitter<Partial<User>>();
  @Output() close = new EventEmitter<void>();
  form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],

    }],
    password: ['', {
      validators: [Validators.required, Validators.minLength(4)],
      // , createPasswordsStrengthValidator()
    }]
  });
  constructor(private fb: FormBuilder) { }


  submit(form) {
    if (form.valid) {
      const fromValue: Partial<User> = form.getRawValue();
      if (fromValue) {
        this.submittedForm.emit(fromValue);
      }
    }
    this.form.reset();
  }
  onClose() {
    this.close.emit();
    this.form.reset();
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

}
