import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private apiConfig: ApiConfig,
    private messageService: MessageService,
    private router: Router
  ) {
    if (this.apiService.currentUserValue) {
      this.router.navigate(['/edit-profile']);
    }
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
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
    });
  }

  onSubmit() {
    this.apiService
      .putDataToService(this.apiConfig.editProfile, this.editProfileForm.value)
      .subscribe(
        (res: any) => {
          res.token = JSON.parse(localStorage.getItem('userToken')!)
          localStorage.setItem(
            'currentUser',
            JSON.stringify(res)
          );
          this.messageService.setMsg({
            msg: 'Profile updated successfully!',
            type: 'success',
          });
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
