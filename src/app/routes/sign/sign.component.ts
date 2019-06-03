import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '@app/core/services/http-client.service';

@Component({
  selector   : 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls  : ['./sign.component.styl'],
})
export class SignComponent implements OnInit {
  useActive       = false;
  useSignUpSend   = true;
  useSignInSubmit = true;

  signInForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signUpForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    code    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  constructor(private _fb: FormBuilder, private _http: HttpClientService) {
  }

  open() {
    this.useActive = true;
  }

  close() {
    this.useActive = false;
  }

  sendCode() {
    console.log(this.signUpForm.value);
    this._http.post('sendCode', '/user/code', this.signUpForm.value).subscribe(v => {
      console.log(v);
    });
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

  private formStatusChanges() {
    this.signUpForm.statusChanges.subscribe(
      v => {
        console.log(v);
        // this.useSignUpSend = v === 'INVALID';
        const usernameStatus = this.signUpForm.get('username');
        const passwordStatus = this.signUpForm.get('password');
        this.useSignUpSend   = !(usernameStatus.status === 'VALID' && passwordStatus.status === 'VALID');
      }
    );

    this.signInForm.statusChanges.subscribe(
      v => {
        console.log(v);
        // this.~InSubmit = v === 'INVALID';
        const r = this.signInForm.get(['username', 'password']);
        console.log(r);
      }
    );
  }

  ngOnInit() {
    this.formStatusChanges();
  }
}
