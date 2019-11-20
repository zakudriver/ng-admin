import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '@app/core/services/http-client.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CacheService } from '@app/core/services/cache.service';
import { LayoutService } from '@app/layout/layout.service';

@Component({
  selector: 'z-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.styl']
})
export class SignComponent implements OnInit {
  isActive = false;
  isSignUpSend = true;
  isSignInSubmit = true;

  signInForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signUpForm: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClientService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _cacheSer: CacheService
  ) {}

  open() {
    this.isActive = true;
  }

  close() {
    this.isActive = false;
  }

  sendCode() {
    this._http.post<{ codeId: string }>('sendCode', '/user/code', this.signUpForm.value).subscribe(v => {
      this._snackBar.open(v.msg);
      this._cacheSer.setSession('codeID', v.data.codeId);
    });
  }

  submitSignUp() {
    const codeId = this._cacheSer.getSession('codeID');
    const params = Object.assign({ codeId }, this.signUpForm.value);

    this._http.post('submitSignUp', '/usersvc/signup', params).subscribe(v => {
      this._snackBar.open(v.msg);
      this.isActive = false;
    });
  }

  submitSignIn() {
    const params = this.signInForm.value;
    this._http.post('submitSignIn', '/usersvc/login', params).subscribe(r => {
      if (!r.error) {
        this._router.navigateByUrl('/');
      }
      this._snackBar.open(r.msg);
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

  private _formStatusChanges() {
    this.signUpForm.statusChanges.subscribe(v => {
      const usernameStatus = this.signUpForm.get('username');
      const passwordStatus = this.signUpForm.get('password');
      if (usernameStatus && passwordStatus) {
        this.isSignUpSend = !(usernameStatus.status === 'VALID' && passwordStatus.status === 'VALID');
      }
    });

    this.signInForm.statusChanges.subscribe(v => {
      this.isSignInSubmit = v === 'INVALID';
    });
  }

  ngOnInit() {
    this._formStatusChanges();
  }
}
