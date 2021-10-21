import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';
import { EncrDecrService } from 'src/app/services/encrdecr.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  rememberMeUser = JSON.parse(localStorage.getItem('rememberMeUser')!);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private apiConfig: ApiConfig,
    private messageService: MessageService,
    private EncrDecr: EncrDecrService
  ) {
    if (this.apiService.currentUserValue) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', { validators: Validators.required }],
      password: ['', { validators: Validators.required }],
      rememberMe: [false],
    });
    this.loginForm.controls['email'].setValue(
      this.rememberMeUser ? this.rememberMeUser.email : ''
    );
    this.loginForm.controls['password'].setValue(
      this.rememberMeUser
        ? this.EncrDecr.get('123456$#@$^@1ERF', this.rememberMeUser.password)
        : ''
    );
  }

  login(): void {
    this.apiService
      .postLoginDataToService(this.apiConfig.login, this.loginForm.value)
      .subscribe(
        (res: any) => {
          if (this.loginForm.value.rememberMe) {
            const encrypted = this.EncrDecr.set(
              '123456$#@$^@1ERF',
              this.loginForm.value.password
            );
            localStorage.setItem(
              'rememberMeUser',
              JSON.stringify({
                email: this.loginForm.value.email,
                password: encrypted,
              })
            );
          }
          localStorage.setItem('currentUser', JSON.stringify(res));
          localStorage.setItem('userToken', JSON.stringify(res.token));
          this.router.navigate(['/profile']);
        },
        (err) => {
          this.messageService.setMsg({
            msg: err.error.message,
            type: 'danger',
          });
        }
      );
  }
}
