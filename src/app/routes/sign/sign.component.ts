import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector   : 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls  : ['./sign.component.styl'],
})
export class SignComponent implements OnInit {
  useActive = false;

  signInForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signUpForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private _fb: FormBuilder) {
  }

  open() {
    this.useActive = true;
  }

  close() {
    this.useActive = false;
  }

  formErr(form: string, field: string): string {
    const formField = this[`${form}Form`].get(field);
    if (formField.hasError('required')) {
      return 'You must enter a value';
    }
    if (formField.hasError('minlength')) {
      return 'You must enter min 6 length';
    }
    return '';
  }

  submitSignIn() {
    console.log(this.signInForm.value);

  }

  ngOnInit() {
  }
}
