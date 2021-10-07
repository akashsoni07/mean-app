import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { passwordMatch } from './signup.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  success: boolean = false;
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
    this.signupForm = this.formBuilder.group(
      {
        firstName: [
          '',
          {
            validators: [Validators.required, Validators.minLength(2)],
          },
        ],
        lastName: [
          '',
          {
            validators: [Validators.required, Validators.minLength(2)],
          },
        ],
        email: ['', { validators: [Validators.required, Validators.email] }],
        password: [
          '',
          {
            validators: [Validators.required, Validators.minLength(6)],
          },
        ],
        confirmPassword: '',
      },
      {
        validators: passwordMatch,
      }
    );
  }

  signup() {
    this.apiService
      .postDataToService(this.apiConfig.signup, this.signupForm.value)
      .subscribe(
        (res: any) => {
          this.success = true;
          localStorage.setItem('emailToken', JSON.stringify(res.emailToken));
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
