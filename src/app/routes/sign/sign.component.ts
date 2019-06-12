import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '@app/core/services/http-client.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(private _fb: FormBuilder, private _http: HttpClientService, private _snackBar: MatSnackBar) {
  }

  open() {
    this.useActive = true;
  }

  close() {
    this.useActive = false;
  }

  sendCode() {
    this._http.post<{ codeId: string }>('sendCode', '/user/code', this.signUpForm.value).subscribe(v => {
      console.log(v);
      if (v.code === 0) {
        this._snackBar.open(v.msg);
        localStorage.setItem('codeId', v.data.codeId);
      }
    });
  }

  signUp() {
    const params = Object.assign({codeId: localStorage.getItem('codeId')}, this.signUpForm.value);

    this._http.post('sendCode', '/user/signup', params).subscribe(v => {
      console.log(v);
      this._snackBar.open(v.msg);
      if (v.code === 0) {
        this.useActive = false;
      }
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
        const usernameStatus = this.signUpForm.get('username');
        const passwordStatus = this.signUpForm.get('password');
        this.useSignUpSend   = !(usernameStatus.status === 'VALID' && passwordStatus.status === 'VALID');
      }
    );

    this.signInForm.statusChanges.subscribe(
      v => {
        this.useSignInSubmit = v === 'INVALID';
      }
    );
  }

  ngOnInit() {
    this.formStatusChanges();
  }
}
