import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { resetPasswordMatch } from '../reset-password/reset-password.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  success: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private apiConfig: ApiConfig,
    private messageService: MessageService,
    private router: Router
  ) {
    if (this.apiService.currentUserValue) {
      this.router.navigate(['/change-password']);
    }
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          {
            validators: Validators.required,
          },
        ],
        newPassword: [
          '',
          {
            validators: [Validators.required, Validators.minLength(6)],
          },
        ],
        confirmNewPassword: '',
      },
      {
        validators: resetPasswordMatch,
      }
    );
  }

  onSubmit() {
    this.apiService
      .putDataToService(
        this.apiConfig.changePassword,
        this.changePasswordForm.value
      )
      .subscribe(
        (res) => {
          this.success = true;
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
