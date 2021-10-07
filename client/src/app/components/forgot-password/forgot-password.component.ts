import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  success: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private apiConfig: ApiConfig,
    private messageService: MessageService
  ) {
    if (this.apiService.currentUserValue) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  onSubmit(): void {
    this.apiService
      .postDataToService(
        this.apiConfig.forgotPassword,
        this.forgotPasswordForm.value
      )
      .subscribe(
        (res: any) => {
          this.success = true;
          localStorage.setItem('resetToken', JSON.stringify(res.resetToken));
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
