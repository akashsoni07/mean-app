import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { resetPasswordMatch } from './reset-password.validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token = JSON.parse(localStorage.getItem('resetToken')!);
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private apiConfig: ApiConfig,
    private messageService: MessageService,
    private router: Router
  ) {
    if (this.apiService.currentUserValue) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        newPassword: [
          '',
          {
            validators: [Validators.required, Validators.minLength(6)],
          },
        ],
        confirmNewPassword: ''
      },
      {
        validators: resetPasswordMatch,
      }
    );
  }

  onSubmit(): void {
    const body = {
      token: this.token,
      newPassword: this.resetPasswordForm.value.newPassword,
      confirmNewPassword: this.resetPasswordForm.value.confirmNewPassword,
    };
    this.apiService
      .postDataToService(this.apiConfig.resetPassword, body)
      .subscribe(
        (res:any) => {
          this.messageService.setMsg({
            msg: 'Password updated successfully!',
            type: 'success',
          });
          this.router.navigate(['/login']);
        },
        (err) => {
          this.error = err.error.message;
        }
      );
  }
}
